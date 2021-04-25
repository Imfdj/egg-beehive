'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务工时 task_working_hour
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务工时
   * @description 获取 任务工时
   * @request query string name task_working_hour名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_working_hours/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal(ctx.rule.task_working_hourPutBodyReq, ctx.query);
    ctx.validate(allRule, query);
    const res = await service.taskWorkingHours.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务工时
   * @description 获取某个 任务工时
   * @router get /api/v1/task_working_hours
   * @request query number *id eg:1 task_working_hourID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_working_hourId, ctx.query);
    const res = await service.taskWorkingHours.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务工时
   * @description 创建 任务工时
   * @router post /api/v1/task_working_hours
   * @request body task_working_hourBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_working_hourBodyReq, ctx.request.body);
    await ctx.service.taskWorkingHours.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务工时
   * @description 更新 任务工时
   * @router put /api/v1/task_working_hours
   * @request body task_working_hourPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_working_hourPutBodyReq, ctx.request.body);
    const res = await service.taskWorkingHours.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务工时
   * @description 批量删除 任务工时
   * @router delete /api/v1/task_working_hours
   * @request body task_working_hourDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_working_hourDelBodyReq, ctx.request.body);
    const res = await service.taskWorkingHours.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
