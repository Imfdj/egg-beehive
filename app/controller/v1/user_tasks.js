'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户-任务关系表 user_task
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 用户-任务关系表
   * @description 获取 用户-任务关系表
   * @request query string name user_task名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/user_tasks/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.user_taskPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.userTasks.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 用户-任务关系表
   * @description 获取某个 用户-任务关系表
   * @router get /api/v1/user_tasks
   * @request query number *id eg:1 user_taskID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_taskId, ctx.query);
    const res = await service.userTasks.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 用户-任务关系表
   * @description 创建 用户-任务关系表
   * @router post /api/v1/user_tasks
   * @request body user_taskBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.user_taskBodyReq, ctx.request.body);
    const res = await ctx.service.userTasks.create(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.INVALID_REQUEST({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 用户-任务关系表
   * @description 更新 用户-任务关系表
   * @router post /api/v1/user_tasks
   * @request body user_taskPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_taskPutBodyReq, ctx.request.body);
    const res = await service.userTasks.update(ctx.request.body);
    res && res[1] && res[1].length ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 用户-任务关系表
   * @description 批量删除 用户-任务关系表
   * @router delete /api/v1/user_tasks
   * @request body user_taskDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.user_taskDelBodyReq, ctx.request.body);
    const res = await service.userTasks.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建或删除 用户-任务关系表
   * @description 创建或删除 用户-任务关系表
   * @router post /api/v1/user_tasks/change
   * @request body user_taskDelBodyReq
   */
  async change() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.user_taskBodyReq, ctx.request.body);
    const res = await ctx.service.userTasks.change(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.INVALID_REQUEST({ ctx });
  }
}

module.exports = RoleController;
