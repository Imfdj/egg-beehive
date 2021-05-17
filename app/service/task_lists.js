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
    const { ctx, service } = this;
    const { project_id } = payload;
    // 非项目成员则无权创建此项目的任务列表
    const project = await service.tasks.getProjectForMember(project_id);
    if (!project) {
      ctx.helper.body.UNAUTHORIZED({ ctx, msg: '非项目成员则无权创建此项目的任务列表' });
      return false;
    }
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
    const { ctx, service } = this;
    const { project_id } = payload;
    // 非项目成员则无权修改此项目的任务列表
    const project = await service.tasks.getProjectForMember(project_id);
    if (!project) {
      ctx.helper.body.UNAUTHORIZED({ ctx, msg: '非项目成员则无权修改此项目的任务列表' });
      return false;
    }
    return await ctx.model.TaskLists.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  /**
   * 获取当前用户为项目成员的任务
   * @param payload
   * @return {Promise<*>}
   */
  async getTaskListForMember(payload) {
    const { ctx } = this;
    return await ctx.model.TaskLists.findAll({
      where: {
        id: payload,
      },
      include: [
        {
          model: ctx.model.Projects,
          as: 'project',
          required: true,
          include: [
            {
              model: ctx.model.Users,
              as: 'member',
              where: {
                id: ctx.currentRequestData.userInfo.id,
              },
            },
          ],
        },
      ],
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    const taskListsExist = await ctx.model.TaskLists.findAll({
      where: {
        id: payload.ids,
      },
    });
    // 如果存在任务列表数量和此用户为项目成员的任务列表数量不一致，则认为存在删除非项目成员任务列表，则 非项目成员则无权删除此项目的任务列表
    const taskLists = await this.getTaskListForMember(payload.ids);
    if (taskListsExist.length !== taskLists.length) {
      ctx.helper.body.UNAUTHORIZED({ ctx, msg: '非项目成员则无权删除此项目的任务列表' });
      return false;
    }
    return await ctx.model.TaskLists.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }

  async sort(payload) {
    const { ctx } = this;
    const { preId, nextId } = payload;
    // 非项目成员则无权修改此项目的任务列表
    const taskLists = await this.getTaskListForMember(payload.id);
    if (!(taskLists && taskLists.length)) {
      ctx.helper.body.UNAUTHORIZED({ ctx, msg: '非项目成员则无权修改此项目的任务列表' });
      return false;
    }
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
