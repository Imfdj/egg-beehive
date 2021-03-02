'use strict';

const Controller = require('egg').Controller;

/**
 * @controller __cname__ _objectName_
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 __cname__
   * @description 获取 __cname__
   * @request query string name _objectName_名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/_objectName_s/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal(ctx.rule._objectName_PutBodyReq, ctx.query);
    ctx.validate(allRule, query);
    const res = await service._objectNameHump_s.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 __cname__
   * @description 获取某个 __cname__
   * @router get /api/v1/_objectName_s
   * @request query number *id eg:1 _objectName_ID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule._objectName_Id, ctx.query);
    const res = await service._objectNameHump_s.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 __cname__
   * @description 创建 __cname__
   * @router post /api/v1/_objectName_s
   * @request body _objectName_BodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule._objectName_BodyReq, ctx.request.body);
    await ctx.service._objectNameHump_s.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 __cname__
   * @description 更新 __cname__
   * @router put /api/v1/_objectName_s
   * @request body _objectName_PutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule._objectName_PutBodyReq, ctx.request.body);
    const res = await service._objectNameHump_s.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 __cname__
   * @description 批量删除 __cname__
   * @router delete /api/v1/_objectName_s
   * @request body _objectName_DelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule._objectName_DelBodyReq, ctx.request.body);
    const res = await service._objectNameHump_s.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
