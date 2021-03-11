'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, title } = payload;
    const where = payload.where;
    const Order = [];
    title ? (where.title = { [Op.like]: `%${title}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.ProjectFiles.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.ProjectFiles.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.ProjectFiles.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.ProjectFiles.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.ProjectFiles.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }
}

module.exports = _objectName_Service;
