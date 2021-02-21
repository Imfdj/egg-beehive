'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务 task
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务
   * @description 获取 任务
   * @request query string name task名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/tasks/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      name: {
        ...ctx.rule.taskBodyReq.name,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.taskPutBodyReq), ''],
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
    const res = await service.tasks.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务
   * @description 获取某个 任务
   * @router get /api/v1/tasks
   * @request query number *id eg:1 taskID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.taskId, ctx.query);
    const res = await service.tasks.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务
   * @description 创建 任务
   * @router post /api/v1/tasks
   * @request body taskBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.taskBodyReq, ctx.request.body);
    await ctx.service.tasks.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务
   * @description 更新 任务
   * @router put /api/v1/tasks
   * @request body taskPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.taskBodyReq, ctx.request.body);
    const res = await service.tasks.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务
   * @description 批量删除 任务
   * @router delete /api/v1/tasks
   * @request body taskDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.taskDelBodyReq, ctx.request.body);
    const res = await service.tasks.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 更新任务排序
   * @description 更新任务排序
   * @router put /api/v1/tasks/sort
   * @request body taskPutBodyReq
   */
  async sort() {
    const { ctx, service } = this;
    const params = {
      task_list_id: {
        type: 'number',
        required: true,
      },
      id: {
        type: 'number',
        required: true,
      },
      preId: {
        type: 'number',
        required: false,
      },
      nextId: {
        type: 'number',
        required: false,
      },
    };
    ctx.validate(params, ctx.request.body);
    const res = await service.tasks.sort(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
