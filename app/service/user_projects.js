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
}

module.exports = _objectName_Service;
