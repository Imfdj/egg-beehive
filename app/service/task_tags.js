'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name, project_id } = payload;
    const where = {};
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    !ctx.helper.tools.isParam(project_id) ? (where.project_id = project_id) : null;
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
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTags.destroy({
      where: { id: payload.ids },
    });
  }
}

module.exports = _objectName_Service;
