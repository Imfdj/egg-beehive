'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, description } = payload;
    const where = payload.where;
    const Order = [];
    description ? (where.description = { [Op.like]: `%${ description }%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.TaskWorkingHours.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.Users,
          attributes: ['username', 'id', 'avatar'],
          as: 'executor',
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskWorkingHours.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.TaskWorkingHours.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.TaskWorkingHours.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskWorkingHours.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }
}

module.exports = _objectName_Service;
