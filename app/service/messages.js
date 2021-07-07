'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name } = payload;
    const where = payload.where;
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Messages.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.Users,
          attributes: ['username', 'id', 'avatar'],
          as: 'actor',
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Messages.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.Messages.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Messages.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Messages.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }
}

module.exports = _objectName_Service;
