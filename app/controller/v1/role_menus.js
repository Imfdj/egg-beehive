'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 角色-菜单关系表 role_menu
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 角色-菜单关系表
   * @description 获取 角色-菜单关系表
   * @request query number role_id 角色ID
   * @request query number menu_id 菜单ID
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/role_menus/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.role_menuPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.roleMenus.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 角色-菜单关系表
   * @description 获取某个 角色-菜单关系表
   * @router get /api/v1/role_menus
   * @request query number *id eg:1 role_menuID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.role_menuId, ctx.query);
    const res = await service.roleMenus.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 角色-菜单关系表
   * @description 创建 角色-菜单关系表
   * @router post /api/v1/role_menus
   * @request body role_menuBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.role_menuBodyReq, ctx.request.body);
    await ctx.service.roleMenus.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 角色-菜单关系表
   * @description 更新 角色-菜单关系表
   * @router put /api/v1/role_menus
   * @request body role_menuPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.role_menuPutBodyReq, ctx.request.body);
    const res = await service.roleMenus.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 角色-菜单关系表
   * @description 批量删除 角色-菜单关系表
   * @router delete /api/v1/role_menus
   * @request body role_menuDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.role_menuDelBodyReq, ctx.request.body);
    const res = await service.roleMenus.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 单角色-多菜单关系
   * @description 创建 单角色-多菜单关系
   * @router post /api/v1/role_menus/bulk_menu
   * @request body user_roleBodyReq
   */
  async bulkCreateMenu() {
    const ctx = this.ctx;
    const params = {
      role_id: ctx.rule.role_menuPutBodyReq.role_id,
      menu_ids: {
        type: 'array',
        itemType: 'number',
        rule: {
          min: 1,
        },
        min: 1,
      },
    };
    ctx.validate(params, ctx.request.body);
    await ctx.service.roleMenus.bulkCreateMenu(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }
}

module.exports = RoleController;
