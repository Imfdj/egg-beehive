'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 项目模板 project_template
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 项目模板
   * @description 获取 项目模板
   * @request query string name project_template名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/project_templates/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      name: {
        ...ctx.rule.project_templateBodyReq.name,
        required: false,
      },
      is_custom: {
        ...ctx.rule.project_templateBodyReq.is_custom,
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.project_templatePutBodyReq), ''],
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
    const res = await service.projectTemplates.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 项目模板
   * @description 获取某个 项目模板
   * @router get /api/v1/project_templates
   * @request query number *id eg:1 project_templateID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_templateId, ctx.query);
    const res = await service.projectTemplates.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 项目模板
   * @description 创建 项目模板
   * @router post /api/v1/project_templates
   * @request body project_templateBodyReq
   */
  async create() {
    const ctx = this.ctx;
    // 如果创建时没有设置封面则，使用默认图片
    if (!ctx.request.body.cover) ctx.request.body.cover = 'https://i.picsum.photos/id/144/290/160.jpg?hmac=YqNSGR5rI_GhpG42s5ed0XbRwXv4JXDCdH3b0OqB9fE';
    ctx.validate(ctx.rule.project_templateBodyReq, ctx.request.body);
    await ctx.service.projectTemplates.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 项目模板
   * @description 更新 项目模板
   * @router put /api/v1/project_templates
   * @request body project_templatePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_templatePutBodyReq, ctx.request.body);
    const res = await service.projectTemplates.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 项目模板
   * @description 批量删除 项目模板
   * @router delete /api/v1/project_templates
   * @request body project_templateDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_templateDelBodyReq, ctx.request.body);
    const res = await service.projectTemplates.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
