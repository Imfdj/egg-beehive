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
    return await ctx.model.Departments.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Departments.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.Departments.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Departments.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    // 开启事务
    const transaction = await ctx.model.transaction();
    // 删除部门前，要将部门下的所有成员department_id 置为0
    await ctx.model.Users.update({ department_id: 0 }, { where: { department_id: payload.ids }, transaction });
    const res = await ctx.model.Departments.destroy({ where: { id: payload.ids }, transaction });
    if (res && res[0] !== 0) {
      await transaction.commit();
      return true;
    }
    await transaction.rollback();
    return false;
  }
}

module.exports = _objectName_Service;
