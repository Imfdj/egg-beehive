'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 角色-资源关系表 role_permission
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 角色-资源关系表
   * @description 获取 角色-资源关系表
   * @request query string role_id 角色ID
   * @request query string permission_id 资源ID
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/role_permissions/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      role_id: {
        ...ctx.rule.role_permissionBodyReq.role_id,
        required: false,
      },
      permission_id: {
        ...ctx.rule.role_permissionBodyReq.permission_id,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.role_permissionPutBodyReq), ''],
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
    const res = await service.rolePermissions.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 角色-资源关系表
   * @description 获取某个 角色-资源关系表
   * @router get /api/v1/role_permissions
   * @request query number *id eg:1 role_permissionID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.role_permissionId, ctx.query);
    const res = await service.rolePermissions.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 角色-资源关系表
   * @description 创建 角色-资源关系表
   * @router post /api/v1/role_permissions
   * @request body role_permissionBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.role_permissionBodyReq, ctx.request.body);
    await ctx.service.rolePermissions.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 角色-资源关系表
   * @description 更新 角色-资源关系表
   * @router put /api/v1/role_permissions
   * @request body role_permissionPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.role_permissionPutBodyReq, ctx.request.body);
    const res = await service.rolePermissions.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 角色-资源关系表
   * @description 批量删除 角色-资源关系表
   * @router delete /api/v1/role_permissions
   * @request body role_permissionDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.role_permissionDelBodyReq, ctx.request.body);
    const res = await service.rolePermissions.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 单角色-多资源关系
   * @description 创建 单角色-多资源关系
   * @router post /api/v1/role_permissions/bulk_permission
   * @request body role_permissionBodyReq
   */
  async bulkCreatePremission() {
    const ctx = this.ctx;
    const params = {
      role_id: ctx.rule.role_permissionBodyReq.role_id,
      permission_ids: {
        type: 'array',
        itemType: 'number',
        rule: {
          min: 1,
        },
        min: 1,
      },
    };
    ctx.validate(params, ctx.request.body);
    await ctx.service.rolePermissions.bulkCreatePremission(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }
}

module.exports = RoleController;
