'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 邀请 invite
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 邀请
   * @description 获取 邀请
   * @request query string name invite名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/invites/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.invitePutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.invites.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 邀请
   * @description 获取某个 邀请
   * @router get /api/v1/invites
   * @request query number *id eg:1 inviteID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.inviteId, ctx.query);
    const res = await service.invites.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 邀请
   * @description 创建 邀请
   * @router post /api/v1/invites
   * @request body inviteBodyReq
   */
  async create() {
    const ctx = this.ctx;
    const rule = {
      ...ctx.rule.inviteBodyReq,
      group: {
        type: 'enum',
        required: true,
        values: ['Projects'],
      },
    };
    ctx.validate(rule, ctx.request.body);
    const res = await ctx.service.invites.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx, res });
  }

  /**
   * @apikey
   * @summary 更新 邀请
   * @description 更新 邀请
   * @router put /api/v1/invites
   * @request body invitePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    delete ctx.request.body.expires;
    ctx.validate(ctx.rule.invitePutBodyReq, ctx.request.body);
    const res = await service.invites.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 邀请
   * @description 批量删除 邀请
   * @router delete /api/v1/invites
   * @request body inviteDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.inviteDelBodyReq, ctx.request.body);
    const res = await service.invites.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 获取某个 邀请,expires时间小于app.config.inviteExpiresCreateRange,则创建一个新的邀请，并返回
   * @description 获取某个 邀请,expires时间小于app.config.inviteExpiresCreateRange,则创建一个新的邀请，并返回
   * @router get /api/v1/invites/valid
   * @request query string *group eg:Projects 群体
   * @request query number *group_id eg:1 群体ID
   */
  async findValidOne() {
    const { ctx, service } = this;
    const rule = {
      group: ctx.rule.inviteBodyReq.group,
      group_id: ctx.rule.inviteBodyReq.group_id,
    };
    ctx.validate(rule, ctx.query);
    const res = await service.invites.findValidOne(ctx.query);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 获取某个 邀请
   * @description 获取某个 邀请
   * @router get /api/v1/invites
   * @request query number *id eg:1 inviteID
   */
  async findOneByUUID() {
    const { ctx, service } = this;
    const rule = {
      uuid: {
        ...ctx.rule.inviteBodyReq.uuid,
        required: true,
      },
    };
    ctx.validate(rule, ctx.query);
    const res = await service.invites.findOneByUUID(ctx.query.uuid);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
