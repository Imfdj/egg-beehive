'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户-角色关系表 user_role
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 用户-角色关系表
   * @description 获取 用户-角色关系表
   * @request query number user_id 用户ID
   * @request query number role_id 角色ID
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/user_roles/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      user_id: {
        ...ctx.rule.user_roleBodyReq.user_id,
        required: false,
      },
      role_id: {
        ...ctx.rule.user_roleBodyReq.role_id,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.user_rolePutBodyReq), ''],
      },
      order: {
        type: 'enum',
        required: false,
        values: ['desc', 'asc', ''],
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
    const res = await service.userRoles.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 用户-角色关系表
   * @description 获取某个 用户-角色关系表
   * @router get /api/v1/user_roles
   * @request query number *id eg:1 user_roleID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_roleId, ctx.query);
    const res = await service.userRoles.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 用户-角色关系表
   * @description 创建 用户-角色关系表
   * @router post /api/v1/user_roles
   * @request body user_roleBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.user_roleBodyReq, ctx.request.body);
    await ctx.service.userRoles.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 用户-角色关系表
   * @description 更新 用户-角色关系表
   * @router put /api/v1/user_roles
   * @request body user_rolePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_rolePutBodyReq, ctx.request.body);
    const res = await service.userRoles.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 用户-角色关系表
   * @description 批量删除 用户-角色关系表
   * @router delete /api/v1/user_roles
   * @request body user_roleDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_roleDelBodyReq, ctx.request.body);
    const res = await service.userRoles.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 单用户-多角色关系
   * @description 创建 单用户-多角色关系
   * @router post /api/v1/user_roles/bulk_role
   * @request body user_roleBodyReq
   */
  async bulkCreateRole() {
    const ctx = this.ctx;
    const params = {
      user_id: ctx.rule.user_roleBodyReq.user_id,
      role_ids: {
        type: 'array',
        itemType: 'number',
        rule: {
          min: 1,
        },
        min: 1,
      },
    };
    ctx.validate(params, ctx.request.body);
    await ctx.service.userRoles.bulkCreateRole(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }
}

module.exports = RoleController;
