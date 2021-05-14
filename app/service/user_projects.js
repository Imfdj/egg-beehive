'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order } = payload;
    const where = payload.where;
    const Order = [];
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.UserProjects.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.UserProjects.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.UserProjects.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.UserProjects.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.UserProjects.destroy({
      where: { id: payload.ids },
    });
  }

  async quit(payload) {
    const { ctx, app } = this;
    const project = await ctx.model.Projects.findOne({
      where: {
        id: payload.project_id,
        manager_id: payload.user_id,
      },
    });
    // 如果此用户不是此项目的拥有者
    if (!project) {
      // 获取此用户在此项目下所拥有的任务
      const tasks = await ctx.model.Tasks.findAll({
        where: {
          project_id: payload.project_id,
          creator_id: ctx.currentRequestData.userInfo.id,
        },
      });
      if (tasks.length) {
        ctx.helper.body.INVALID_REQUEST({ ctx, msg: '此项目存在用户为拥有者的任务, 无法退出' });
        return false;
      }
      const transaction = await ctx.model.transaction();
      try {
        const res = await ctx.model.UserProjects.destroy({
          where: payload,
          transaction,
        });
        // 同时删除用户和此项目的任务关系, 即退出该项目的任务参与者
        await ctx.model.UserTasks.destroy({
          where: payload,
          transaction,
        });
        await transaction.commit();
        return res;
      } catch (e) {
        await transaction.rollback();
        app.logger.errorAndSentry(e);
        throw e;
      }
    }
    ctx.helper.body.INVALID_REQUEST({ ctx, msg: '项目拥有者无法退出自己的项目' });
    return false;
  }
}

module.exports = _objectName_Service;
