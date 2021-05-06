'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务标签 task_tag
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务标签
   * @description 获取 任务标签
   * @request query string name task_tag名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_tags/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.task_tagPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.taskTags.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务标签
   * @description 获取某个 任务标签
   * @router get /api/v1/task_tags
   * @request query number *id eg:1 task_tagID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_tagId, ctx.query);
    const res = await service.taskTags.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务标签
   * @description 创建 任务标签
   * @router post /api/v1/task_tags
   * @request body task_tagBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_tagBodyReq, ctx.request.body);
    await ctx.service.taskTags.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务标签
   * @description 更新 任务标签
   * @router put /api/v1/task_tags
   * @request body task_tagPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_tagPutBodyReq, ctx.request.body);
    const res = await service.taskTags.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务标签
   * @description 批量删除 任务标签
   * @router delete /api/v1/task_tags
   * @request body task_tagDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_tagDelBodyReq, ctx.request.body);
    const res = await service.taskTags.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
