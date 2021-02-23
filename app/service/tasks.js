'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name } = payload;
    const where = {};
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Tasks.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Tasks.findOne({
      where: { id },
      include: [
        {
          model: ctx.model.TaskTags,
          // attributes: ['id', 'name', 'color', 'task_task_tags'],
          // exclude: ['created_at', 'updated_at', 'task_task_tags'],
        },
        {
          model: ctx.model.Users,
          as: 'participators',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });
  }

  async create(payload) {
    const { ctx } = this;
    const { task_list_id } = payload;
    const tasks = await ctx.model.Tasks.findAll({
      where: {
        task_list_id,
      },
      order: [['sort', 'desc']],
    });
    payload.sort = tasks[0] ? tasks[0].sort + 65536 : 65536;
    return await ctx.model.Tasks.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Tasks.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Tasks.destroy({
      where: { id: payload.ids },
    });
  }

  async sort(payload) {
    const { ctx } = this;
    const { preId, nextId, task_list_id } = payload;
    let sort = 0;
    if (nextId !== undefined && preId !== undefined) {
      const pre = await ctx.model.Tasks.findOne({ where: { id: preId } });
      const next = await ctx.model.Tasks.findOne({ where: { id: nextId } });
      if (pre && next) {
        sort = (pre.sort + next.sort) / 2;
        return await ctx.model.Tasks.update(
          { sort, task_list_id },
          {
            where: { id: payload.id },
          }
        );
      }
      return false;
    }
    if (preId !== undefined) {
      const pre = await ctx.model.Tasks.findOne({ where: { id: preId } });
      sort = pre.sort + 1000;
      return await ctx.model.Tasks.update(
        { sort, task_list_id },
        {
          where: { id: payload.id },
        }
      );
    }
    if (nextId !== undefined) {
      const next = await ctx.model.Tasks.findOne({ where: { id: nextId } });
      sort = next.sort / 1.1;
      return await ctx.model.Tasks.update(
        { sort, task_list_id },
        {
          where: { id: payload.id },
        }
      );
    }
    if (nextId === undefined && nextId === undefined) {
      return await ctx.model.Tasks.update(
        { task_list_id },
        {
          where: { id: payload.id },
        }
      );
    }
  }
}

module.exports = _objectName_Service;
