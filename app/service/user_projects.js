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

  async quit(payload) {
    const { ctx } = this;
    const project = await ctx.model.Projects.findOne({
      where: {
        id: payload.project_id,
        manager_id: payload.user_id,
      },
    });
    // 如果此用户不是此项目的拥有者
    if (!project) {
      return await ctx.model.UserProjects.destroy({
        where: payload,
      });
    }
    ctx.helper.body.INVALID_REQUEST({ ctx, msg: '项目拥有者无法退出自己的项目' });
    return false;
  }
}

module.exports = _objectName_Service;
