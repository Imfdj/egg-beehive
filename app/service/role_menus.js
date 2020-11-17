'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx, app } = this;
    const { limit, offset, prop_order, order, role_id, menu_id } = payload;
    const where = app.lodash.pickBy({ role_id, menu_id }, app.lodash.identity);
    const Order = [];
    prop_order && order ? Order.push([ prop_order, order ]) : null;
    return await ctx.model.RoleMenus.findAndCountAll({
      limit, offset, where, order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.RoleMenus.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.RoleMenus.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.RoleMenus.update(payload, { where: { id: payload.id } });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.RoleMenus.destroy({ where: { id: payload.ids } });
  }

  /**
   *  单角色批量添加多菜单
   * @param payload
   * @return {Promise<void>}
   */
  async bulkCreateMenu(payload) {
    const { ctx } = this;
    payload = payload.menu_ids.map(e => {
      return { role_id: payload.role_id, menu_id: e };
    });
    return await ctx.model.RoleMenus.bulkCreate(payload);
  }
}

module.exports = _objectName_Service;
