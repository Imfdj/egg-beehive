'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 项目 project
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 项目
   * @description 获取 项目
   * @request query string name project名
   * @request query number state 状态 enum:1,2,3 eg:项目状态.1为正常、2为已归档、3为已在回收站
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/projects/list
   */
  async findAll() {
    const { ctx, service } = this;

    const { allRule, query } = ctx.helper.tools.findAllParamsDeal({
      rule: ctx.rule.projectPutBodyReq,
      queryOrigin: ctx.query,
      ruleOther: {
        state: {
          ...ctx.rule.projectBodyReq.state,
          required: false,
          type: 'enum',
          values: [1, '1'],
        },
        is_recycle: {
          ...ctx.rule.projectBodyReq.is_recycle,
          type: 'enum',
          values: [0, '0', 1, '1'],
        },
        is_archived: {
          ...ctx.rule.projectBodyReq.is_recycle,
          type: 'enum',
          values: [0, '0', 1, '1'],
        },
        collection: {
          type: 'enum',
          values: [0, '0', 1, '1'],
          required: false,
          description: '是否只显示收藏.1为true,0为false',
        },
      },
    });
    ctx.validate(allRule, query);
    const res = await service.projects.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 项目
   * @description 获取某个 项目
   * @router get /api/v1/projects
   * @request query number *id eg:1 projectID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.projectId, ctx.query);
    const res = await service.projects.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 项目
   * @description 创建 项目
   * @router post /api/v1/projects
   * @request body projectBodyReq
   */
  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.rule.projectBodyReq,
      state: {
        ...ctx.rule.projectBodyReq.state,
        type: 'enum',
        values: [1, 2, 3, '1', '2', '3'],
      },
      is_recycle: {
        ...ctx.rule.projectBodyReq.is_recycle,
        type: 'enum',
        values: [0, 1, '0', '1'],
      },
      is_archived: {
        ...ctx.rule.projectBodyReq.is_recycle,
        type: 'enum',
        values: [0, 1, '0', '1'],
      },
    };
    ctx.validate(params, ctx.request.body);
    await ctx.service.projects.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 项目
   * @description 更新 项目
   * @router put /api/v1/projects
   * @request body projectPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    const params = {
      ...ctx.rule.projectPutBodyReq,
      state: {
        ...ctx.rule.projectPutBodyReq.state,
        type: 'enum',
        required: false,
        values: [1, 2, 3, '1', '2', '3'],
      },
      is_recycle: {
        ...ctx.rule.projectPutBodyReq.is_recycle,
        type: 'enum',
        values: [0, 1, '0', '1'],
      },
      is_archived: {
        ...ctx.rule.projectPutBodyReq.is_recycle,
        type: 'enum',
        values: [0, 1, '0', '1'],
      },
    };
    ctx.validate(params, ctx.request.body);
    const res = await service.projects.update(ctx.request.body);
    if (res === false) return;
    res && res[1] && res[1].length ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.UNAUTHORIZED({ ctx, msg: '只有项目拥有者才能修改项目信息' });
  }

  /**
   * @apikey
   * @summary 批量删除 项目
   * @description 批量删除 项目
   * @router delete /api/v1/projects
   * @request body projectDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.projectDelBodyReq, ctx.request.body);
    const res = await service.projects.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 获取某个 项目统计
   * @description 获取某个 项目统计
   * @router get /api/v1/projects/statistics
   * @request query number *id eg:1 projectID
   */
  async projectStatistics() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.projectId, ctx.query);
    const res = await service.projects.projectStatistics(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
