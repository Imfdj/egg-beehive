'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const {
      limit, offset, prop_order, order, name,
    } = payload;
    const where = payload.where;
    const Order = [];
    name ? (where.name = { [Op.like]: `%${ name }%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Tasks.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Tasks.findOne({
      where: { id },
      include: [
        {
          model: ctx.model.TaskTags,
          // attributes: ['id', 'name', 'color', 'task_task_tags'],
          // exclude: ['created_at', 'updated_at', 'task_task_tags'],
        },
        {
          model: ctx.model.Users,
          as: 'participators',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });
  }

  async create(payload) {
    const { ctx } = this;
    const { task_list_id } = payload;
    const { id: userId } = ctx.currentRequestData.userInfo;
    const transaction = await ctx.model.transaction();
    try {
      const tasks = await ctx.model.Tasks.findAll({
        where: {
          task_list_id,
        },
        order: [['sort', 'desc']],
      });
      payload.sort = tasks[0] ? tasks[0].sort + 65536 : 65536;
      const res = await ctx.model.Tasks.create({
        ...payload,
        creator_id: userId,
      }, { transaction });
      // 创建任务，默认创建日志：“创建了任务”
      const taskLog = {
        remark: '创建了任务',
        content: payload.name,
        task_id: res.id,
        project_id: payload.project_id,
        operator_id: userId,
        type: 'create',
        icon: 'el-icon-plus',
      };
      await ctx.model.TaskLogs.create(taskLog, { transaction });
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async update(payload) {
    const { ctx, app } = this;
    const task = await ctx.model.Tasks.findOne({
      where: { id: payload.id },
    });
    const taskLog = {
      remark: '',
      task_id: payload.id,
      project_id: task.project_id,
      operator_id: ctx.currentRequestData.userInfo.id,
      type: '',
      icon: '',
    };
    const transaction = await ctx.model.transaction();
    try {
      if (app.lodash.has(payload, 'name')) {
        taskLog.remark = '更新了内容';
        taskLog.type = 'name';
        taskLog.icon = 'el-icon-edit';
        taskLog.content = payload.name;
      }
      if (app.lodash.has(payload, 'task_state_id')) {
        const state = await ctx.model.TaskStates.findOne({
          where: { id: payload.task_state_id },
        });
        taskLog.remark = `修改执行状态为 ${ state.name }`;
        taskLog.icon = 'el-icon-pie-chart';
        taskLog.type = 'state';
      }
      if (app.lodash.has(payload, 'task_type_id')) {
        const type = await ctx.model.TaskTypes.findOne({
          where: { id: payload.task_type_id },
        });
        taskLog.remark = `修改任务类型为 ${ type.name }`;
        taskLog.type = 'type';
        taskLog.icon = 'el-icon-edit';
      }
      if (app.lodash.has(payload, 'task_priority_id')) {
        const priority = await ctx.model.TaskPrioritys.findOne({
          where: { id: payload.task_priority_id },
        });
        taskLog.remark = `修改任务优先级为 ${ priority.name }`;
        taskLog.type = 'priority';
        taskLog.icon = 'el-icon-edit';
      }
      if (app.lodash.has(payload, 'executor_id')) {
        const { executor_id } = payload;
        if (executor_id === 0) {
          taskLog.remark = '移除了执行者';
        } else if (executor_id === ctx.currentRequestData.userInfo.id) {
          taskLog.remark = '认领了任务';
        } else {
          const executor = await ctx.model.Users.findOne({
            where: { id: executor_id },
          });
          // 如果此用户还没参与此任务，则参与任务
          await ctx.model.UserTasks.findOrCreate({
            where: {
              user_id: executor_id,
              task_id: payload.id,
            },
            transaction,
          });
          taskLog.remark = `指派给了 ${ executor.username }`;
        }
        taskLog.type = 'priority';
        taskLog.icon = 'el-icon-user';
      }
      if (app.lodash.has(payload, 'start_date')) {
        if (payload.start_date) {
          taskLog.remark = `更新开始时间为 ${ payload.start_date }`;
        } else {
          taskLog.remark = '清除了开始时间';
        }
        taskLog.type = 'start_date';
        taskLog.icon = 'el-icon-date';
      }
      if (app.lodash.has(payload, 'end_date')) {
        if (payload.end_date) {
          taskLog.remark = `更新截止时间为 ${ payload.end_date }`;
        } else {
          taskLog.remark = '清除了截止时间';
        }
        taskLog.type = 'end_date';
        taskLog.icon = 'el-icon-date';
      }
      if (app.lodash.has(payload, 'remark')) {
        taskLog.remark = '更新了备注';
        taskLog.type = 'remark';
        taskLog.content = payload.remark;
        taskLog.icon = 'el-icon-document';
      }
      if (app.lodash.has(payload, 'is_recycle')) {
        taskLog.remark = payload.is_recycle ? '将任务放入了回收站' : '从回收站中还原了任务';
        taskLog.type = 'is_recycle';
        taskLog.icon = 'el-icon-delete';
      }
      await ctx.model.TaskLogs.create(taskLog, { transaction });
      const res = await ctx.model.Tasks.update(payload, {
        where: { id: payload.id },
        transaction,
      });
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Tasks.destroy({
      where: { id: payload.ids },
    });
  }

  async sort(payload) {
    const { ctx } = this;
    const { preId, nextId, task_list_id } = payload;
    let sort = 0;
    if (nextId !== undefined && preId !== undefined) {
      const pre = await ctx.model.Tasks.findOne({ where: { id: preId } });
      const next = await ctx.model.Tasks.findOne({ where: { id: nextId } });
      if (pre && next) {
        sort = (pre.sort + next.sort) / 2;
        return await ctx.model.Tasks.update(
          { sort, task_list_id },
          {
            where: { id: payload.id },
          }
        );
      }
      return false;
    }
    if (preId !== undefined) {
      const pre = await ctx.model.Tasks.findOne({ where: { id: preId } });
      sort = pre.sort + 1000;
      return await ctx.model.Tasks.update(
        { sort, task_list_id },
        {
          where: { id: payload.id },
        }
      );
    }
    if (nextId !== undefined) {
      const next = await ctx.model.Tasks.findOne({ where: { id: nextId } });
      sort = next.sort / 1.1;
      return await ctx.model.Tasks.update(
        { sort, task_list_id },
        {
          where: { id: payload.id },
        }
      );
    }
    if (nextId === undefined && nextId === undefined) {
      return await ctx.model.Tasks.update(
        { task_list_id },
        {
          where: { id: payload.id },
        }
      );
    }
  }
}

module.exports = _objectName_Service;
