'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 站内信 message
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 站内信
   * @description 获取 站内信
   * @request query string name message名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/messages/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.messagePutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.messages.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 站内信
   * @description 获取某个 站内信
   * @router get /api/v1/messages
   * @request query number *id eg:1 messageID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.messageId, ctx.query);
    const res = await service.messages.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 站内信
   * @description 创建 站内信
   * @router post /api/v1/messages
   * @request body messageBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.messageBodyReq, ctx.request.body);
    await ctx.service.messages.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 站内信
   * @description 更新 站内信
   * @router put /api/v1/messages
   * @request body messagePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.messagePutBodyReq, ctx.request.body);
    const res = await service.messages.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 站内信
   * @description 批量删除 站内信
   * @router delete /api/v1/messages
   * @request body messageDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.messageDelBodyReq, ctx.request.body);
    const res = await service.messages.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
