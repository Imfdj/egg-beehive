'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name, project_id } = payload;
    const where = {};
    const Order = [
      ['sort', 'asc'],
      // [ctx.model.Tasks, 'sort', 'asc'],
    ];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    !ctx.helper.tools.isParam(project_id) ? (where.project_id = project_id) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.TaskLists.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      // include: [
      //   {
      //     model: ctx.model.Tasks,
      //     attributes: {
      //       exclude: ['created_at', 'updated_at'],
      //     },
      //     include: [
      //       {
      //         model: ctx.model.TaskTags,
      //         // attributes: ['username', 'id', 'avatar'],
      //       },
      //       {
      //         model: ctx.model.Users,
      //         attributes: ['username', 'id', 'avatar'],
      //         as: 'executor',
      //       },
      //     ],
      //   },
      // ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskLists.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLists.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLists.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLists.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }
}

module.exports = _objectName_Service;
