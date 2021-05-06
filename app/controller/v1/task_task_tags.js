'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务-任务标签关系表 task_task_tag
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务-任务标签关系表
   * @description 获取 任务-任务标签关系表
   * @request query string name task_task_tag名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_task_tags/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.task_task_tagPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.taskTaskTags.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务-任务标签关系表
   * @description 获取某个 任务-任务标签关系表
   * @router get /api/v1/task_task_tags
   * @request query number *id eg:1 task_task_tagID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_task_tagId, ctx.query);
    const res = await service.taskTaskTags.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务-任务标签关系表
   * @description 创建 任务-任务标签关系表
   * @router post /api/v1/task_task_tags
   * @request body task_task_tagBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_task_tagBodyReq, ctx.request.body);
    const res = await ctx.service.taskTaskTags.create(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.INVALID_REQUEST({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务-任务标签关系表
   * @description 更新 任务-任务标签关系表
   * @router put /api/v1/task_task_tags
   * @request body task_task_tagPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_task_tagPutBodyReq, ctx.request.body);
    const res = await service.taskTaskTags.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务-任务标签关系表
   * @description 批量删除 任务-任务标签关系表
   * @router delete /api/v1/task_task_tags
   * @request body task_task_tagDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_task_tagDelBodyReq, ctx.request.body);
    const res = await service.taskTaskTags.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建或删除 任务-任务标签关系表
   * @description 创建或删除 任务-任务标签关系表
   * @router post /api/v1/task_task_tags/change
   * @request body task_task_tagBodyReq
   */
  async change() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_task_tagBodyReq, ctx.request.body);
    const res = await ctx.service.taskTaskTags.change(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.INVALID_REQUEST({ ctx });
  }
}

module.exports = RoleController;
