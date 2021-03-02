'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户-项目-收藏关系表 user_project_collect
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 创建或删除 用户-项目-收藏关系表
   * @description 创建或删除 用户-项目-收藏关系表
   * @router post /api/v1/user_project_collects/change
   * @request body user_project_collectBodyReq
   */
  async change() {
    const { ctx } = this;
    ctx.validate(ctx.rule.user_project_collectBodyReq, ctx.request.body);
    await ctx.service.userProjectCollects.change(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }
}

module.exports = RoleController;
