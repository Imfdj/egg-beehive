'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 部门 department
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 部门
   * @description 获取 部门
   * @request query string name department名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/departments/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      name: {
        ...ctx.rule.departmentBodyReq.name,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.departmentPutBodyReq), ''],
      },
      order: {
        type: 'enum',
        required: false,
        values: ['desc', 'asc', ''],
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
    const res = await service.departments.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 部门
   * @description 获取某个 部门
   * @router get /api/v1/departments
   * @request query number *id eg:1 departmentID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.departmentId, ctx.query);
    const res = await service.departments.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 部门
   * @description 创建 部门
   * @router post /api/v1/departments
   * @request body departmentBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.departmentBodyReq, ctx.request.body);
    await ctx.service.departments.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 部门
   * @description 更新 部门
   * @router put /api/v1/departments
   * @request body departmentPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.departmentPutBodyReq, ctx.request.body);
    const res = await service.departments.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 部门
   * @description 批量删除 部门
   * @router delete /api/v1/departments
   * @request body departmentDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.departmentDelBodyReq, ctx.request.body);
    const res = await service.departments.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
