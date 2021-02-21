'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name, mark, mark_name, url, action, keyword } = payload;
    const where = {};
    const Order = [];
    keyword
      ? (where[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        { mark: { [Op.like]: `%${keyword}%` } },
        { mark_name: { [Op.like]: `%${keyword}%` } },
        { url: { [Op.like]: `%${keyword}%` } },
        { action: { [Op.like]: `%${keyword}%` } },
      ])
      : null;
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    mark ? (where.mark = { [Op.like]: `%${mark}%` }) : null;
    mark_name ? (where.mark_name = { [Op.like]: `%${mark_name}%` }) : null;
    url ? (where.url = url) : null;
    action ? (where.action = action) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Permissions.findAndCountAll({
      ctx,
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Permissions.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    const { url, action } = payload;
    const one = await ctx.model.Permissions.findOne({ where: { url, action } });
    if (one) {
      const err = new Error('已存在');
      err.parent = {};
      err.parent.errno = 1062;
      throw err;
    }
    return await ctx.model.Permissions.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    const { id, url, action } = payload;
    const one = await ctx.model.Permissions.findOne({
      where: { id: { [Op.not]: id }, url, action },
    });
    if (one) {
      const err = new Error('已存在');
      err.parent = {};
      err.parent.errno = 1062;
      throw err;
    }
    return await ctx.model.Permissions.update(payload, {
      ctx,
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    const delData = await ctx.model.Permissions.findAll({
      where: { id: payload.ids },
    });
    return await ctx.model.Permissions.destroy({
      ctx,
      where: { id: payload.ids },
      delData,
    });
  }
}

module.exports = _objectName_Service;
