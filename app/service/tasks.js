'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const {
      limit,
      offset,
      prop_order,
      order,
      name,
      executor_ids,
      creator_ids,
      task_priority_ids,
      task_state_ids,
      date_start_created,
      date_end_created,
      participator_id,
    } = payload;
    const where = payload.where;
    const Order = [];
    !where[Op.or] ? (where[Op.or] = []) : null;
    executor_ids ? where[Op.or].push({ executor_id: executor_ids }) : null;
    creator_ids ? where[Op.or].push({ creator_id: creator_ids }) : null;
    task_priority_ids ? where[Op.or].push({ task_priority_id: task_priority_ids }) : null;
    task_state_ids ? where[Op.or].push({ task_state_id: task_state_ids }) : null;
    date_start_created || date_end_created
      ? (where[Op.and] = [
        {
          created_at: {
            [Op.gte]: date_start_created || '0001-01-01 00:00:01',
            [Op.lte]: date_end_created || '9001-01-01 00:00:01',
          },
        },
      ])
      : null;
    if (!where[Op.or].length) {
      delete where[Op.or];
    }
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    const participatorsWhere = participator_id ? { id: participator_id } : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    let whereProject = null;
    if (!limit) {
      whereProject = {};
      // 只有项目成员才能查看项目任务，除非是公开项目
      whereProject[Op.or] = [
        { id: ctx.currentRequestData.userInfo.id },
        {
          '$project.is_private$': 0,
        },
      ];
    }
    return await ctx.model.Tasks.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.TaskTags,
          // attributes: ['username', 'id', 'avatar'],
        },
        {
          model: ctx.model.Users,
          attributes: ['username', 'id', 'avatar'],
          as: 'executor',
        },
        {
          model: ctx.model.Users,
          as: 'participators',
          attributes: ['id', 'username', 'avatar'],
          where: participatorsWhere,
        },
        {
          model: ctx.model.Projects,
          as: 'project',
          required: true,
          attributes: ['id', 'name'],
          include: [
            {
              model: ctx.model.Users,
              as: 'member',
              attributes: ['id', 'username'],
              where: whereProject,
              required: true,
            },
          ],
        },
      ],
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
      const res = await ctx.model.Tasks.create(
        {
          ...payload,
          creator_id: userId,
        },
        { transaction }
      );
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
      // 创建任务，默认将创建者加入参与此任务
      await ctx.model.UserTasks.create(
        {
          user_id: userId,
          task_id: res.id,
          project_id: payload.project_id,
        },
        { transaction }
      );
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
    const taskNameSpan = `<span class="task-name">${task.name}</span>`;
    const taskLog = {
      remark: '',
      task_id: payload.id,
      project_id: task.project_id,
      operator_id: ctx.currentRequestData.userInfo.id,
      type: '',
      icon: '',
    };
    // 创建站内信
    const message = {
      actor_id: ctx.currentRequestData.userInfo.id,
      receiver_id: '',
      content: '',
      type: 'inform',
      url: `/pojectManagement/Project/${task.project_id}?taskId=${payload.id}`,
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
        taskLog.remark = `修改执行状态为 ${state.name}`;
        taskLog.icon = 'el-icon-pie-chart';
        taskLog.type = 'state';
        message.content = `更改了任务 ${taskNameSpan} 的执行状态为 <span class="state" style="color: ${state.color};">${state.name}</span>`;
      }
      if (app.lodash.has(payload, 'task_type_id')) {
        const type = await ctx.model.TaskTypes.findOne({
          where: { id: payload.task_type_id },
        });
        taskLog.remark = `修改任务类型为 ${type.name}`;
        taskLog.type = 'type';
        taskLog.icon = 'el-icon-edit';
      }
      if (app.lodash.has(payload, 'task_priority_id')) {
        const priority = await ctx.model.TaskPrioritys.findOne({
          where: { id: payload.task_priority_id },
        });
        taskLog.remark = `修改任务优先级为 ${priority.name}`;
        taskLog.type = 'priority';
        taskLog.icon = 'el-icon-edit';
      }
      if (app.lodash.has(payload, 'executor_id')) {
        const { executor_id } = payload;
        if (executor_id === 0) {
          taskLog.type = 'executor_remove';
          taskLog.remark = '移除了执行者';
          message.content = `移除了任务 ${taskNameSpan} 的执行者`;
        } else if (executor_id === ctx.currentRequestData.userInfo.id) {
          // 如果此用户还没参与此任务，则参与任务
          await ctx.model.UserTasks.findOrCreate({
            where: {
              user_id: executor_id,
              task_id: payload.id,
              project_id: task.project_id,
            },
            transaction,
          });
          taskLog.type = 'executor_claim';
          taskLog.remark = '认领了任务';
          message.content = `认领了任务 ${taskNameSpan}`;
        } else {
          const executor = await ctx.model.Users.findOne({
            where: { id: executor_id },
          });
          // 如果此用户还没参与此任务，则参与任务
          await ctx.model.UserTasks.findOrCreate({
            where: {
              user_id: executor_id,
              task_id: payload.id,
              project_id: task.project_id,
            },
            transaction,
          });
          taskLog.type = 'executor_assign';
          taskLog.remark = `指派给了 ${executor.username}`;
          message.content = `将任务 ${taskNameSpan} 指派给了 <span class="executor">${executor.username}</span>`;
        }
        taskLog.icon = 'el-icon-user';
      }
      if (app.lodash.has(payload, 'start_date')) {
        if (payload.start_date) {
          taskLog.remark = `更新开始时间为 ${payload.start_date}`;
        } else {
          taskLog.remark = '清除了开始时间';
        }
        taskLog.type = 'start_date';
        taskLog.icon = 'el-icon-date';
      }
      if (app.lodash.has(payload, 'end_date')) {
        if (payload.end_date) {
          taskLog.remark = `更新截止时间为 ${payload.end_date}`;
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
      if (app.lodash.has(payload, 'is_done')) {
        const { is_done } = payload;
        taskLog.remark = is_done === 1 ? '完成了任务' : '重做了任务';
        taskLog.type = 'is_done';
        taskLog.icon = 'el-icon-check';
        message.content = `更改了任务 ${taskNameSpan} 的完成状态为 ${is_done === 1 ? '<span class="done">已完成</span>' : '<span class="redo">未完成</span>'}`;
      }
      await ctx.model.TaskLogs.create(taskLog, { transaction });
      const res = await ctx.model.Tasks.update(payload, {
        where: { id: payload.id },
        transaction,
        individualHooks: true,
      });
      await transaction.commit();
      // 当修改了是否完成状态、执行状态、执行者 则创建站内信，发送给非操作者的所有任务参与者
      if (app.lodash.has(payload, 'is_done') || app.lodash.has(payload, 'executor_id') || app.lodash.has(payload, 'task_state_id')) {
        ctx.model.UserTasks.findAll({ where: { task_id: payload.id } })
          .then(userTasks => {
            userTasks.forEach(userTask => {
            // 除去操作者
              if (userTask.user_id.toString() === ctx.currentRequestData.userInfo.id.toString()) return;
              message.receiver_id = userTask.user_id;
              // 如果是执行者更改的指派情况，message的接收者和执行者的id相同
              if (taskLog.type === 'executor_assign' && payload.executor_id === message.receiver_id) {
                message.content = `指派给你一个任务 ${taskNameSpan}`;
              }
              ctx.model.Messages.create(message);
            });
          });
      }
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
      individualHooks: true,
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
            individualHooks: true,
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
          individualHooks: true,
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
          individualHooks: true,
        }
      );
    }
    if (preId === undefined && nextId === undefined) {
      return await ctx.model.Tasks.update(
        { task_list_id },
        {
          where: { id: payload.id },
          individualHooks: true,
        }
      );
    }
  }

  async recycleAllTaskOfTaskList(payload) {
    const { ctx } = this;
    const { task_list_id } = payload;
    return await ctx.model.Tasks.update(
      { is_recycle: 1 },
      {
        where: { task_list_id },
        individualHooks: true,
      }
    );
  }
}

module.exports = _objectName_Service;
