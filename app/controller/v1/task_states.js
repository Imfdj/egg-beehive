'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务状态 task_state
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务状态
   * @description 获取 任务状态
   * @request query string name task_state名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_states/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.task_statePutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.taskStates.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务状态
   * @description 获取某个 任务状态
   * @router get /api/v1/task_states
   * @request query number *id eg:1 task_stateID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_stateId, ctx.query);
    const res = await service.taskStates.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务状态
   * @description 创建 任务状态
   * @router post /api/v1/task_states
   * @request body task_stateBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_stateBodyReq, ctx.request.body);
    await ctx.service.taskStates.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务状态
   * @description 更新 任务状态
   * @router put /api/v1/task_states
   * @request body task_statePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_statePutBodyReq, ctx.request.body);
    const res = await service.taskStates.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务状态
   * @description 批量删除 任务状态
   * @router delete /api/v1/task_states
   * @request body task_stateDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_stateDelBodyReq, ctx.request.body);
    const res = await service.taskStates.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
