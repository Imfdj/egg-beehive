'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, remark, task_id, is_comment } = payload;
    const where = {};
    const Order = [];
    remark ? (where.remark = { [Op.like]: `%${ remark }%` }) : null;
    !ctx.helper.tools.isParam(task_id) ? where.task_id = task_id : null;
    !ctx.helper.tools.isParam(is_comment) ? where.is_comment = is_comment : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.TaskLogs.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.Users,
          as: 'operator',
          attributes: {
            exclude: ['updated_at'],
          },
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskLogs.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLogs.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLogs.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLogs.destroy({
      where: { id: payload.ids },
    });
  }
}

module.exports = _objectName_Service;
