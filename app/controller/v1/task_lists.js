'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 任务列表 task_list
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 任务列表
   * @description 获取 任务列表
   * @request query string name task_list名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/task_lists/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.task_listPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.taskLists.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 任务列表
   * @description 获取某个 任务列表
   * @router get /api/v1/task_lists
   * @request query number *id eg:1 task_listID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_listId, ctx.query);
    const res = await service.taskLists.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 任务列表
   * @description 创建 任务列表
   * @router post /api/v1/task_lists
   * @request body task_listBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.task_listBodyReq, ctx.request.body);
    await ctx.service.taskLists.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 任务列表
   * @description 更新 任务列表
   * @router put /api/v1/task_lists
   * @request body task_listPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_listPutBodyReq, ctx.request.body);
    const res = await service.taskLists.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 任务列表
   * @description 批量删除 任务列表
   * @router delete /api/v1/task_lists
   * @request body task_listDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.task_listDelBodyReq, ctx.request.body);
    const res = await service.taskLists.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 更新任务列表排序
   * @description 更新任务列表排序
   * @router put /api/v1/task_lists/sort
   * @request body taskPutBodyReq
   */
  async sort() {
    const { ctx, service } = this;
    const params = {
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
    const { preId, nextId } = ctx.request.body;
    if (!(preId || nextId)) {
      ctx.helper.body.VALIDATION_FAILED({
        ctx,
        res: {
          error: 'Validation Failed',
          detail: [
            {
              message: 'required',
              field: 'preId or nextId',
              code: 'missing_field, nextId.Preid or preId must have one',
            },
          ],
        },
      });
      return;
    }
    const res = await service.taskLists.sort(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
