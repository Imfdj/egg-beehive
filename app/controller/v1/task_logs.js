'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务日志 task_log
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务日志
   * @description 获取 任务日志
   * @request query string name task_log名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_logs/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      remark: {
        ...ctx.rule.task_logBodyReq.remark,
        required: false,
      },
      task_id: {
        ...ctx.rule.task_logBodyReq.task_id,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.task_logPutBodyReq), ''],
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
    const res = await service.taskLogs.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务日志
   * @description 获取某个 任务日志
   * @router get /api/v1/task_logs
   * @request query number *id eg:1 task_logID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_logId, ctx.query);
    const res = await service.taskLogs.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务日志
   * @description 创建 任务日志
   * @router post /api/v1/task_logs
   * @request body task_logBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_logBodyReq, ctx.request.body);
    await ctx.service.taskLogs.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务日志
   * @description 更新 任务日志
   * @router put /api/v1/task_logs
   * @request body task_logPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_logPutBodyReq, ctx.request.body);
    const res = await service.taskLogs.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务日志
   * @description 批量删除 任务日志
   * @router delete /api/v1/task_logs
   * @request body task_logDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_logDelBodyReq, ctx.request.body);
    const res = await service.taskLogs.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
