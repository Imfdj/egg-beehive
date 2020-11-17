'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx, app } = this;
    const { limit, offset, prop_order, order, user_id, role_id } = payload;
    const where = app.lodash.pickBy({ user_id, role_id }, app.lodash.identity);
    const Order = [];
    prop_order && order ? Order.push([ prop_order, order ]) : null;
    return await ctx.model.UserRoles.findAndCountAll({
      limit, offset, where, order: Order, include: [
        {
          model: ctx.model.Roles,
          attributes: {
            exclude: [ 'created_at', 'updated_at' ],
          },
          where: {
            // name: { [ Op.like ]: '%stri%' },
          },
        },
      ],
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.UserRoles.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.UserRoles.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.UserRoles.update(payload, { where: { id: payload.id } });
  }

  async destroy(payload) {
    const { ctx } = this;
    const delData = await ctx.model.UserRoles.findAll({ where: { id: payload.ids } });
    return await ctx.model.UserRoles.destroy({ where: { id: payload.ids }, delData });
  }

  /**
   *  单用户批量添加多角色
   * @param payload
   * @return {Promise<void>}
   */
  async bulkCreateRole(payload) {
    const { ctx } = this;
    payload = payload.role_ids.map(e => {
      return { user_id: payload.user_id, role_id: e };
    });
    return await ctx.model.UserRoles.bulkCreate(payload);
  }

  /**
   * 获取用户所有的角色
   * @param payload
   */
  async getUserRoleIds(payload) {
    const { ctx, app } = this;
    const res = await ctx.model.UserRoles.findAll({ where: { user_id: payload.user_id } });
    const roleIds = res.map(e => e.role_id);
    app.redis.sadd(ctx.helper.redisKeys.userRoleIdsBaseUserId(payload.user_id), roleIds)
      .then(() => {
        // 设置3天的过期期限
        app.redis.expire(ctx.helper.redisKeys.userRoleIdsBaseUserId(payload.user_id), 60 * 60 * 24 * 3);
      });
    return roleIds;
  }
}

module.exports = _objectName_Service;
