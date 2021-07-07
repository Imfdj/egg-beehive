'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务类型 task_type
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务类型
   * @description 获取 任务类型
   * @request query string name task_type名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_types/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.task_typePutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.taskTypes.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务类型
   * @description 获取某个 任务类型
   * @router get /api/v1/task_types
   * @request query number *id eg:1 task_typeID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_typeId, ctx.query);
    const res = await service.taskTypes.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务类型
   * @description 创建 任务类型
   * @router post /api/v1/task_types
   * @request body task_typeBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_typeBodyReq, ctx.request.body);
    await ctx.service.taskTypes.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务类型
   * @description 更新 任务类型
   * @router put /api/v1/task_types
   * @request body task_typePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_typePutBodyReq, ctx.request.body);
    const res = await service.taskTypes.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务类型
   * @description 批量删除 任务类型
   * @router delete /api/v1/task_types
   * @request body task_typeDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_typeDelBodyReq, ctx.request.body);
    const res = await service.taskTypes.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
