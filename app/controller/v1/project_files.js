'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 项目文件 project_file
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取 项目文件
   * @description 获取 项目文件
   * @request query string name project_file名
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/project_files/list
   */
  async findAll() {
    const { ctx, service } = this;
    const { allRule, query } = ctx.helper.tools.findAllParamsDeal(ctx.rule.project_filePutBodyReq, ctx.query);
    ctx.validate(allRule, query);
    const res = await service.projectFiles.findAll(query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 项目文件
   * @description 获取某个 项目文件
   * @router get /api/v1/project_files
   * @request query number *id eg:1 project_fileID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_fileId, ctx.query);
    const res = await service.projectFiles.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 创建 项目文件
   * @description 创建 项目文件
   * @router post /api/v1/project_files
   * @request body project_fileBodyReq
   */
  async create() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.project_fileBodyReq, ctx.request.body);
    await ctx.service.projectFiles.create(ctx.request.body);
    ctx.helper.body.CREATED_UPDATE({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 项目文件
   * @description 更新 项目文件
   * @router put /api/v1/project_files
   * @request body project_filePutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_filePutBodyReq, ctx.request.body);
    const res = await service.projectFiles.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 项目文件
   * @description 批量删除 项目文件
   * @router delete /api/v1/project_files
   * @request body project_fileDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.project_fileDelBodyReq, ctx.request.body);
    const res = await service.projectFiles.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
