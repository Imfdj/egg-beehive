'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 项目模板任务 project_template_task
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 项目模板任务
   * @description 获取 项目模板任务
   * @request query string name project_template_task名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/project_template_tasks/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.project_template_taskPutBodyReq,
      queryOrigin: ctx.query,
    });
    ctx.validate(allRule, query);
    const res = await service.projectTemplateTasks.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 项目模板任务
   * @description 获取某个 项目模板任务
   * @router get /api/v1/project_template_tasks
   * @request query number *id eg:1 project_template_taskID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_template_taskId, ctx.query);
    const res = await service.projectTemplateTasks.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 项目模板任务
   * @description 创建 项目模板任务
   * @router post /api/v1/project_template_tasks
   * @request body project_template_taskBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.project_template_taskBodyReq, ctx.request.body);
    await ctx.service.projectTemplateTasks.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 项目模板任务
   * @description 更新 项目模板任务
   * @router put /api/v1/project_template_tasks
   * @request body project_template_taskPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_template_taskPutBodyReq, ctx.request.body);
    const res = await service.projectTemplateTasks.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 项目模板任务
   * @description 批量删除 项目模板任务
   * @router delete /api/v1/project_template_tasks
   * @request body project_template_taskDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_template_taskDelBodyReq, ctx.request.body);
    const res = await service.projectTemplateTasks.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
