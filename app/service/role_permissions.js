'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx, app } = this;
    const { limit, offset, prop_order, order, role_id, permission_id } = payload;
    const where = app.lodash.pickBy({ role_id, permission_id }, app.lodash.identity);
    const Order = [];
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.RolePermissions.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.RolePermissions.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.RolePermissions.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.RolePermissions.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    const delData = await ctx.model.RolePermissions.findAll({
      where: { id: payload.ids },
    });
    return await ctx.model.RolePermissions.destroy({
      where: { id: payload.ids },
      delData,
    });
  }

  /**
   *  单角色批量添加多菜单
   * @param payload
   * @return {Promise<void>}
   */
  async bulkCreatePremission(payload) {
    const { ctx } = this;
    payload = payload.permission_ids.map(e => {
      return { role_id: payload.role_id, permission_id: e };
    });
    return await ctx.model.RolePermissions.bulkCreate(payload);
  }
}

module.exports = _objectName_Service;
