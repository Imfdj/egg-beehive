'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx, app } = this;
    const { limit, offset, prop_order, order, name, title } = payload;
    const where = {};
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    title ? (where.title = { [Op.like]: `%${title}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Menus.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Menus.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.Menus.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Menus.update(payload, { where: { id: payload.id } });
  }

  async destroy(payload) {
    const { ctx } = this;
    const res = await ctx.model.Menus.findAll({
      where: { parent_id: payload.ids },
    });
    // 如果当前删除id有子菜单
    if (res.length > 0) {
      const err = new Error('删除失败，当前菜单存在子菜单。');
      err.parent = {};
      err.parent.errno = 1451;
      throw err;
    }
    return await ctx.model.Menus.destroy({ where: { id: payload.ids } });
  }

  /**
   * 根据角色获取菜单
   * @return {Promise<*[]|*>}
   */
  async userMenus() {
    const { ctx, service, app } = this;
    let data = await ctx.model.Users.findAll({
      include: [
        {
          model: ctx.model.Roles,
          // attributes: {
          //   exclude: [ 'user_roles', 'updated_at' ],
          // },
          where: {
            // name: { [ Op.like ]: '%stri%' },
          },
          include: [
            {
              model: ctx.model.Menus,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
              where: {
                // name: { [ Op.like ]: '%stri%' },
              },
            },
          ],
        },
      ],
      where: {
        id: ctx.currentRequestData.userInfo.id,
      },
      raw: false,
    });
    // 如果没有则直接返回空数组
    if (data.length === 0) {
      return [];
    }
    data = data[0].roles;
    // 去重
    const arr = [];
    data.forEach((e, i) => {
      e.menus.forEach((ee, ii) => {
        ee.__roles = {
          id: e.id,
          name: e.name,
        };
        arr.push(ee);
      });
    });
    data = app.lodash.uniqWith(arr, (a, b) => a.id === b.id);
    return data;
  }
}

module.exports = _objectName_Service;
