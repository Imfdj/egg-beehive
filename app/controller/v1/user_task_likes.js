'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户-任务-点赞关系表 user_task_like
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 创建或删除 用户-任务-点赞关系表
   * @description 创建或删除 用户-任务-点赞关系表
   * @router post /api/v1/user_task_likes/change
   * @request body user_task_likeBodyReq
   */
  async change() {
    const { ctx } = this;
    ctx.validate(ctx.rule.user_task_likeBodyReq, ctx.request.body);
    await ctx.service.userTaskLikes.change(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }
}

module.exports = RoleController;
