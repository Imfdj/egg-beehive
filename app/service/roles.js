'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class RoleService extends Service {
  async index(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name } = payload;
    const where = {};
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Roles.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async show(id) {
    const { ctx } = this;
    return await ctx.model.Roles.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.Roles.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Roles.update(payload, { where: { id: payload.id } });
  }

  async destroy(payload) {
    const { ctx } = this;
    const allRoles = await ctx.model.Roles.findAll({
      where: { id: payload.ids },
    });
    if (!allRoles.every(e => e.is_default !== 1)) {
      return { __code_wrong: 40000 };
    }
    return await ctx.model.Roles.destroy({ where: { id: payload.ids } });
  }

  async updateIsDefault(payload) {
    const { ctx } = this;
    const transaction = await ctx.model.transaction();
    await ctx.model.Roles.update({ is_default: 0 }, { where: { is_default: 1 }, transaction });
    const res = await ctx.model.Roles.update({ is_default: 1 }, { where: { id: payload.id }, transaction });
    if (res && res[0] === 1) {
      await transaction.commit();
      return true;
    }
    await transaction.rollback();
    return false;
  }
}

module.exports = RoleService;
