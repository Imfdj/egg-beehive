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
    return await ctx.model.TaskTaskTags.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskTaskTags.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    const { task_id } = payload;
    const task = await ctx.model.Tasks.findOne({ where: { id: task_id } });
    if (!task) return false;
    payload.project_id = task.project_id;
    return await ctx.model.TaskTaskTags.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTaskTags.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTaskTags.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }

  async change(payload) {
    const { ctx } = this;
    const one = await ctx.model.TaskTaskTags.findOne({ where: payload });
    if (one) {
      return await ctx.model.TaskTaskTags.destroy({
        where: payload,
        individualHooks: true,
      });
    }
    const { task_id } = payload;
    const task = await ctx.model.Tasks.findOne({ where: { id: task_id } });
    if (!task) return false;
    payload.project_id = task.project_id;
    return await ctx.model.TaskTaskTags.create(payload);
  }
}

module.exports = _objectName_Service;
