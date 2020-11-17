'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 菜单 menu
 */

class RoleController extends Controller {

  /**
   * @apikey
   * @summary 获取 菜单
   * @description 获取 菜单
   * @request query string name 菜单名
   * @request query string title 菜单标题
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/menus/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      name: {
        ...ctx.rule.menuBodyReq.name,
        required: false,
      },
      title: {
        ...ctx.rule.menuBodyReq.title,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [ ...Object.keys(ctx.rule.menuPutBodyReq), '' ],
      },
      order: {
        type: 'enum',
        required: false,
        values: [ 'desc', 'asc', '' ],
      },
      limit: {
        type: 'number',
        required: false,
        default: 10,
        max: 1000,
      },
      offset: {
        type: 'number',
        required: false,
        default: 0,
      },
    };
    ctx.validate(params, ctx.query);
    const res = await service.menus.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 菜单
   * @description 获取某个 菜单
   * @router get /api/v1/menus
   * @request query number *id eg:1 menuID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.menuId, ctx.query);
    const res = await service.menus.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 菜单
   * @description 创建 菜单
   * @router post /api/v1/menus
   * @request body menuBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.menuBodyReq, ctx.request.body);
    await ctx.service.menus.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 菜单
   * @description 更新 菜单
   * @router put /api/v1/menus
   * @request body menuPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.menuPutBodyReq, ctx.request.body);
    const res = await service.menus.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 菜单
   * @description 批量删除 菜单
   * @router delete /api/v1/menus
   * @request body menuDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.menuDelBodyReq, ctx.request.body);
    const res = await service.menus.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 获取 用户菜单
   * @description 获取 用户菜单
   * @router get /api/v1/menus/user_menus
   */
  async userMenus() {
    const { ctx, service } = this;
    const res = await service.menus.userMenus();
    ctx.helper.body.SUCCESS({ ctx, res });
  }
}

module.exports = RoleController;
