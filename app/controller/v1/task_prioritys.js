'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务优先级 task_priority
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务优先级
   * @description 获取 任务优先级
   * @request query string name task_priority名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_prioritys/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.task_priorityPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.taskPrioritys.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务优先级
   * @description 获取某个 任务优先级
   * @router get /api/v1/task_prioritys
   * @request query number *id eg:1 task_priorityID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_priorityId, ctx.query);
    const res = await service.taskPrioritys.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务优先级
   * @description 创建 任务优先级
   * @router post /api/v1/task_prioritys
   * @request body task_priorityBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_priorityBodyReq, ctx.request.body);
    await ctx.service.taskPrioritys.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务优先级
   * @description 更新 任务优先级
   * @router put /api/v1/task_prioritys
   * @request body task_priorityPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_priorityPutBodyReq, ctx.request.body);
    const res = await service.taskPrioritys.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务优先级
   * @description 批量删除 任务优先级
   * @router delete /api/v1/task_prioritys
   * @request body task_priorityDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_priorityDelBodyReq, ctx.request.body);
    const res = await service.taskPrioritys.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
