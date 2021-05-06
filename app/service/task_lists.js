'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order } = payload;
    const where = payload.where;
    const Order = [['sort', 'asc']];
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.TaskLists.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskLists.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    const { project_id } = payload;
    const taskList = await ctx.model.TaskLists.findAll({
      where: {
        project_id,
      },
      order: [['sort', 'desc']],
    });
    payload.sort = taskList[0] ? taskList[0].sort + 65536 : 65536;
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

  async sort(payload) {
    const { ctx } = this;
    const { preId, nextId } = payload;
    let sort = 0;
    if (nextId !== undefined && preId !== undefined) {
      const pre = await ctx.model.TaskLists.findOne({ where: { id: preId } });
      const next = await ctx.model.TaskLists.findOne({ where: { id: nextId } });
      if (pre && next) {
        sort = (pre.sort + next.sort) / 2;
        return await ctx.model.TaskLists.update(
          { sort },
          {
            where: { id: payload.id },
            individualHooks: true,
          }
        );
      }
      return false;
    }
    if (preId !== undefined) {
      const pre = await ctx.model.TaskLists.findOne({ where: { id: preId } });
      sort = pre.sort + 1000;
      return await ctx.model.TaskLists.update(
        { sort },
        {
          where: { id: payload.id },
          individualHooks: true,
        }
      );
    }
    if (nextId !== undefined) {
      const next = await ctx.model.TaskLists.findOne({ where: { id: nextId } });
      sort = next.sort / 1.1;
      return await ctx.model.TaskLists.update(
        { sort },
        {
          where: { id: payload.id },
          individualHooks: true,
        }
      );
    }
  }
}

module.exports = _objectName_Service;
