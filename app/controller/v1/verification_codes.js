'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 验证码 verification_code
 */

class RoleController extends Controller {

  /**
   * @apikey
   * @summary 获取 验证码
   * @description 获取 验证码
   * @request query string name verification_code名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/verification_codes/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      name: {
        ...ctx.rule.verification_codeBodyReq.name,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [ ...Object.keys(ctx.rule.verification_codePutBodyReq), '' ],
      },
      order: {
        type: 'enum',
        required: false,
        values: [ 'desc', 'asc', '' ],
      },
      limit: {
        type: 'number',
        required: false,
      },
      offset: {
        type: 'number',
        required: false,
        default: 0,
      },
    };
    ctx.validate(params, ctx.query);
    const res = await service.verificationCodes.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 验证码
   * @description 获取某个 验证码
   * @router get /api/v1/verification_codes
   * @request query number *id eg:1 verification_codeID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.verification_codeId, ctx.query);
    const res = await service.verificationCodes.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 验证码
   * @description 创建 验证码
   * @router post /api/v1/verification_codes
   * @request body verification_codeBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.verification_codeBodyReq, ctx.request.body);
    await ctx.service.verificationCodes.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 验证码
   * @description 更新 验证码
   * @router put /api/v1/verification_codes
   * @request body verification_codePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.verification_codePutBodyReq, ctx.request.body);
    const res = await service.verificationCodes.update(ctx.request.body);
    res && res[ 0 ] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 验证码
   * @description 批量删除 验证码
   * @router delete /api/v1/verification_codes
   * @request body verification_codeDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.verification_codeDelBodyReq, ctx.request.body);
    const res = await service.verificationCodes.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 获取 验证此验证码
   * @description 获取 验证此验证码
   * @router get /api/v1/verification_codes/verification
   * @request query string *target eg:1@qq.com 验证对象
   * @request query string *code eg:1111 验证码
   */
  async verification() {
    const { ctx, service } = this;
    const params = {
      code: {
        ...ctx.rule.verification_codeBodyReq.code,
      },
      target: {
        ...ctx.rule.verification_codeBodyReq.target,
      },
    };
    ctx.validate(params, ctx.query);
    const res = await service.verificationCodes.verification(ctx.query);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
