'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name } = payload;
    const where = {};
    const Order = [];
    name ? (where.name = { [Op.like]: `%${ name }%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.UserTasks.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.UserTasks.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.UserTasks.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.UserTasks.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.UserTasks.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }

  async change(payload) {
    const { ctx } = this;
    const one = await ctx.model.UserTasks.findOne({ where: payload });
    if (one) {
      const { user_id, task_id } = payload;
      const transaction = await ctx.model.transaction();
      try {
        const res = await ctx.model.UserTasks.destroy({
          where: payload,
          transaction,
          individualHooks: true,
        });
        // 如果当前用户退出的任务中，是执行者，则将执行者置为待认领
        await ctx.model.Tasks.update({ executor_id: 0 }, {
          where: {
            id: task_id,
            executor_id: user_id,
          },
          transaction,
          individualHooks: true,
        });
        await transaction.commit();
        return res;
      } catch (e) {
        await transaction.rollback();
        throw e;
      }
    }
    return await ctx.model.UserTasks.create(payload);
  }
}

module.exports = _objectName_Service;
