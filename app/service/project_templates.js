'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order } = payload;
    const where = payload.where;
    const Order = [[ctx.model.ProjectTemplateTasks, 'sort', 'desc']];
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.ProjectTemplates.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.ProjectTemplateTasks,
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.ProjectTemplates.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.ProjectTemplates.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.ProjectTemplates.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.ProjectTemplates.destroy({
      where: { id: payload.ids },
    });
  }
}

module.exports = _objectName_Service;
