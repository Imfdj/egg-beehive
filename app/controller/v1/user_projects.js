'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户-项目关系表 user_project
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 用户-项目关系表
   * @description 获取 用户-项目关系表
   * @request query string name user_project名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/user_projects/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.user_projectPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.userProjects.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 用户-项目关系表
   * @description 获取某个 用户-项目关系表
   * @router get /api/v1/user_projects
   * @request query number *id eg:1 user_projectID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_projectId, ctx.query);
    const res = await service.userProjects.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 用户-项目关系表
   * @description 创建 用户-项目关系表
   * @router post /api/v1/user_projects
   * @request body user_projectBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.user_projectBodyReq, ctx.request.body);
    await ctx.service.userProjects.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 用户-项目关系表
   * @description 更新 用户-项目关系表
   * @router put /api/v1/user_projects
   * @request body user_projectPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_projectPutBodyReq, ctx.request.body);
    const res = await service.userProjects.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 用户-项目关系表
   * @description 批量删除 用户-项目关系表
   * @router delete /api/v1/user_projects
   * @request body user_projectDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_projectDelBodyReq, ctx.request.body);
    const res = await service.userProjects.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 删除 用户-项目关系 用户退出项目
   * @description 删除 用户-项目关系 用户退出项目
   * @router delete /api/v1/user_projects/quit
   * @request body user_projectBodyReq
   */
  async quit() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_projectBodyReq, ctx.request.body);
    const res = await service.userProjects.quit(ctx.request.body);
    if (res === false) return;
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
