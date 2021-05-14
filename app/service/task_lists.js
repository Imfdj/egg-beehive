'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, project_id } = payload;
    // 不存在此项目，则返回空数组
    const exist = await ctx.model.Projects.findOne({ where: { id: project_id } });
    if (!exist) {
      return [];
    }
    // 非公共项目，且不是项目成员，则无权获取该项目的任务列表数据
    const project = await ctx.model.Projects.findOne({
      where: {
        id: project_id,
        [Op.or]: [
          { '$member.id$': ctx.currentRequestData.userInfo.id },
          {
            is_private: 0,
          },
        ],
      },
      include: [
        {
          model: ctx.model.Users,
          as: 'member',
        },
      ],
    });
    if (!project) {
      ctx.helper.body.UNAUTHORIZED({ ctx, msg: '非公共项目，且不是项目成员，则无权获取该项目的任务列表数据' });
      return false;
    }
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
      if (pre) {
        sort = pre.sort + 1000;
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
    if (nextId !== undefined) {
      const next = await ctx.model.TaskLists.findOne({ where: { id: nextId } });
      if (next) {
        sort = next.sort / 1.1;
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
  }
}

module.exports = _objectName_Service;
