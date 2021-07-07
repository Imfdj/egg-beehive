'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name, collection } = payload;
    const where = payload.where;
    where[Op.or] = [
      { is_private: 0 },
      {
        '$member.id$': ctx.currentRequestData.userInfo.id,
      },
    ];
    const Order = [];
    const collectorRequired = collection ? parseInt(collection) === 1 : false;
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Projects.findAndCountAll({
      distinct: true,
      // limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.Users,
          attributes: ['username', 'id', 'avatar'],
          as: 'creator',
        },
        {
          model: ctx.model.Users,
          as: 'collector',
          where: {
            id: ctx.currentRequestData.userInfo.id,
          },
          required: collectorRequired,
        },
        {
          model: ctx.model.Users,
          as: 'member',
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Projects.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    // 开启事务
    const transaction = await ctx.model.transaction();
    try {
      const project = await ctx.model.Projects.create(payload);
      const _projectTemplateTasks = await ctx.model.ProjectTemplateTasks.findAll({
        where: {
          project_template_id: project.project_template_id,
        },
        order: [['sort', 'desc']],
      });
      const project_template_tasks = _projectTemplateTasks.map((item, index) => {
        return {
          name: item.name,
          project_id: project.id,
          sort: (index + 1) * 65536,
        };
      });
      // 根据project_template_id获取对应的templateTask生成TaskList
      await ctx.model.TaskLists.bulkCreate(project_template_tasks, { transaction });
      // 创建项目同时将创建者加入此项目
      await ctx.service.userProjects.create(
        {
          user_id: ctx.currentRequestData.userInfo.id,
          project_id: project.id,
        },
        { transaction }
      );
      await transaction.commit();
      return project;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async update(payload) {
    const { ctx } = this;
    const project = await ctx.model.Projects.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!project) {
      ctx.helper.body.NOT_FOUND({ ctx });
      return false;
    }
    return await ctx.model.Projects.update(payload, {
      where: {
        id: payload.id,
        manager_id: ctx.currentRequestData.userInfo.id,
      },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Projects.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }

  async projectStatistics(id) {
    const { ctx, app } = this;
    const list = await ctx.model.Tasks.findAll({ where: { project_id: id } });
    const done = list.filter(item => item.is_done === 1);
    const undone = list.filter(item => item.is_done === 0);
    const overdue = list.filter(item => {
      return item.end_date && app.dayjs()
        .isAfter(app.dayjs(item.end_date));
    });
    const unreceived = list.filter(item => item.executor_id === 0);
    const dueToday = list.filter(item => {
      return item.end_date && app.dayjs()
        .isSame(app.dayjs(item.end_date), 'day');
    });
    const completedOverdue = list.filter(item => {
      return item.is_done === 1 && item.end_date && app.dayjs()
        .isAfter(app.dayjs(item.end_date));
    });
    const taskPriority = app.lodash.groupBy(list, 'task_priority_id');
    for (const argumentsKey in taskPriority) {
      taskPriority[argumentsKey] = taskPriority[argumentsKey].length;
    }
    const taskState = app.lodash.groupBy(list, 'task_state_id');
    for (const argumentsKey in taskState) {
      taskState[argumentsKey] = taskState[argumentsKey].length;
    }
    const taskType = app.lodash.groupBy(list, 'task_type_id');
    for (const argumentsKey in taskType) {
      taskType[argumentsKey] = taskType[argumentsKey].length;
    }
    return {
      taskCount: list.length, // 总任务数
      done: done.length, // 已完成
      undone: undone.length, // 未完成
      overdue: overdue.length, // 逾期
      unreceived: unreceived.length, // 待认领
      dueToday: dueToday.length, // 今日到期
      completedOverdue: completedOverdue.length, // 逾期完成
      taskPriority, // 任务优先级分布数据
      taskState, // 任务状态分布数据
      taskType, // 任务类型分布数据
    };
  }
}

module.exports = _objectName_Service;
