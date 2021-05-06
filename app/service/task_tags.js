'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order } = payload;
    const where = payload.where;
    const Order = [];
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.TaskTags.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskTags.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTags.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTags.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTags.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }
}

module.exports = _objectName_Service;
