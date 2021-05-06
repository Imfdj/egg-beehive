'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 资源 permission
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 资源
   * @description 获取 资源
   * @request query string keyword 资源名/标识码/标识码名/路径/动作
   * @request query string name permission名
   * @request query string mark 标识码
   * @request query string mark_name 标识码名
   * @request query string url 路径
   * @request query string action 动作
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/permissions/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.permissionPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.permissions.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 资源
   * @description 获取某个 资源
   * @router get /api/v1/permissions
   * @request query number *id eg:1 permissionID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.permissionId, ctx.query);
    const res = await service.permissions.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 资源
   * @description 创建 资源
   * @router post /api/v1/permissions
   * @request body permissionBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.permissionBodyReq, ctx.request.body);
    await ctx.service.permissions.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 资源
   * @description 更新 资源
   * @router put /api/v1/permissions
   * @request body permissionPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.permissionPutBodyReq, ctx.request.body);
    const res = await service.permissions.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 资源
   * @description 批量删除 资源
   * @router delete /api/v1/permissions
   * @request body permissionDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.permissionDelBodyReq, ctx.request.body);
    const res = await service.permissions.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
