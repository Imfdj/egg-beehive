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
    const {
      ctx,
      service,
      app: { lodash },
    } = this;
    const rules = {
      executor_ids: {
        type: 'array',
        required: false,
        itemType: 'number',
        description: '执行者IDs',
        example: [1, 2],
      },
      creator_ids: {
        type: 'array',
        required: false,
        itemType: 'number',
        description: '创建者IDs',
        example: [1, 2],
      },
      task_priority_ids: {
        type: 'array',
        required: false,
        itemType: 'number',
        description: '优先级IDs',
        example: [1, 2],
      },
      task_state_ids: {
        type: 'array',
        required: false,
        itemType: 'number',
        description: '执行状态IDs',
        example: [1, 2],
      },
    };
    const roles2 = {
      date_start_created: {
        type: 'dateTime',
        required: false,
        description: '创建的开始时间',
        example: 'YYYY-MM-DD HH:mm:ss',
      },
      date_end_created: {
        type: 'dateTime',
        required: false,
        description: '创建的结束时间',
        example: 'YYYY-MM-DD HH:mm:ss',
      },
    };
    const queries = Object.assign({}, ctx.query);
    for (const key in rules) {
      const data = ctx.queries[key];
      if (data) {
        queries[key] = lodash.isArray(data) ? lodash.map(data, lodash.parseInt) : data;
      }
    }
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.taskPutBodyReq,
      queryOrigin: queries,
      ruleOther: { ...rules, ...roles2 },
    });
    ctx.validate(allRule, query);
    const res = await service.tasks.findAll(query);
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
    const params = {
      ...ctx.rule.taskPutBodyReq,
      name: {
        ...ctx.rule.taskPutBodyReq.name,
        required: false,
      },
      project_id: {
        ...ctx.rule.taskPutBodyReq.project_id,
        required: false,
      },
      task_list_id: {
        ...ctx.rule.taskPutBodyReq.task_list_id,
        required: false,
      },
      task_state_id: {
        ...ctx.rule.taskPutBodyReq.task_state_id,
        required: false,
      },
      task_type_id: {
        ...ctx.rule.taskPutBodyReq.task_type_id,
        required: false,
      },
      task_priority_id: {
        ...ctx.rule.taskPutBodyReq.task_priority_id,
        required: false,
      },
    };
    ctx.validate(params, ctx.request.body);
    const res = await service.tasks.update(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
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

  /**
   * @apikey
   * @summary 将任务列表中的所有任务移到回收站
   * @description 将任务列表中的所有任务移到回收站
   * @router put /api/v1/tasks/recycle_all_task_of_taskList
   * @request body taskRecycleAllTaskOfTaskListBodyReq
   */
  async recycleAllTaskOfTaskList() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.taskRecycleAllTaskOfTaskListBodyReq, ctx.request.body);
    const res = await service.tasks.recycleAllTaskOfTaskList(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
