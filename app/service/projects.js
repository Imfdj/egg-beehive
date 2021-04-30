'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name, collection } = payload;
    const where = payload.where;
    where[Op.or] = [
      { is_private: 0 },
      {
        '$member.id$': ctx.currentRequestData.userInfo.id,
      },
    ];
    const Order = [];
    const collectorRequired = collection ? parseInt(collection) === 1 : false;
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Projects.findAndCountAll({
      distinct: true,
      // limit,
      offset,
      where,
      order: Order,
      include: [
        {
          model: ctx.model.Users,
          attributes: ['username', 'id', 'avatar'],
          as: 'creator',
        },
        {
          model: ctx.model.Users,
          as: 'collector',
          where: {
            id: ctx.currentRequestData.userInfo.id,
          },
          required: collectorRequired,
        },
        {
          model: ctx.model.Users,
          as: 'member',
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Projects.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    // 开启事务
    const transaction = await ctx.model.transaction();
    try {
      const project = await ctx.model.Projects.create(payload);
      const _projectTemplateTasks = await ctx.model.ProjectTemplateTasks.findAll({
        where: {
          project_template_id: project.project_template_id,
        },
        order: [['sort', 'desc']],
      });
      const project_template_tasks = _projectTemplateTasks.map((item, index) => {
        return {
          name: item.name,
          project_id: project.id,
          sort: (index + 1) * 65536,
        };
      });
      // 根据project_template_id获取对应的templateTask生成TaskList
      await ctx.model.TaskLists.bulkCreate(project_template_tasks, { transaction });
      // 创建项目同时将创建者加入此项目
      await ctx.service.userProjects.create(
        {
          user_id: ctx.currentRequestData.userInfo.id,
          project_id: project.id,
        },
        { transaction }
      );
      await transaction.commit();
      return project;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Projects.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Projects.destroy({
      where: { id: payload.ids },
      individualHooks: true,
    });
  }
}

module.exports = _objectName_Service;
