'use strict';

const Controller = require('egg').Controller;
const NodeRSA = require('node-rsa');

/**
 * @controller 用户 user
 */

class RoleController extends Controller {
  /**
   * 健康监测
   */
  healthy() {
    const { ctx, app } = this;
    if (app.running_status) {
      ctx.body = 'ok';
    } else {
      ctx.status = 500;
    }
  }

  /**
   * @apikey
   * @summary 获取 用户
   * @description 获取 用户
   * @request query string keyword 用户名/邮箱/手机
   * @request query string username 用户名
   * @request query string email 邮箱
   * @request query string phone 手机
   * @request query number state 状态
   * @request query number department_id 部门ID
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/users/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
      keyword: {
        type: 'string',
        trim: true,
        required: false,
        max: 50,
      },
      username: {
        ...ctx.rule.userBodyReq.username,
        required: false,
        min: 1,
      },
      email: {
        ...ctx.rule.userBodyReq.email,
        required: false,
        format: /.*/,
      },
      phone: {
        ...ctx.rule.userBodyReq.phone,
        required: false,
        min: 1,
      },
      state: {
        ...ctx.rule.userBodyReq.state,
        required: false,
      },
      department_id: {
        ...ctx.rule.userBodyReq.department_id,
        required: false,
      },
      date_after_created: {
        type: 'dateTime',
        required: false,
      },
      project_id: {
        type: 'number',
        required: false,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(ctx.rule.userPutBodyReq), ''],
      },
      order: {
        type: 'enum',
        required: false,
        values: ['desc', 'asc', ''],
      },
      limit: {
        type: 'number',
        required: false,
        default: 10,
        max: 1000,
      },
      offset: {
        type: 'number',
        required: false,
        default: 0,
      },
    };
    ctx.validate(params, ctx.query);
    const res = await service.users.findAll(ctx.query);
    ctx.helper.body.SUCCESS({ ctx, res });
  }

  /**
   * @apikey
   * @summary 获取某个 用户
   * @description 获取某个 用户
   * @router get /api/v1/users
   * @request query number *id eg:1 userID
   */
  async findOne() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.userId, ctx.query);
    const res = await service.users.findOne(ctx.query.id);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @summary 创建 用户
   * @description 创建 用户
   * @router post /api/v1/users
   * @request body userBodyReq
   */
  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.rule.userCreateBodyReq,
      verification_type: {
        type: 'enum',
        values: [1, 2],
      },
    };
    ctx.validate(params, ctx.request.body);
    const res = await ctx.service.users.create(ctx.request.body);
    if (!res.__code_wrong) {
      ctx.helper.body.CREATED_UPDATE({ ctx });
    } else {
      ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: res.message });
    }
  }

  /**
   * @apikey
   * @summary 更新 用户
   * @description 更新 用户
   * @router put /api/v1/users
   * @request body userPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    const rules = {
      ...ctx.rule.userPutBodyReq,
      username: {
        ...ctx.rule.userPutBodyReq.username,
        required: false,
      },
      password: {
        ...ctx.rule.userPutBodyReq.password,
        required: false,
      },
      email: {
        ...ctx.rule.userPutBodyReq.email,
        required: false,
      },
      last_login: {
        ...ctx.rule.userPutBodyReq.last_login,
        type: 'dateTime',
      },
    };
    ctx.validate(rules, ctx.request.body);
    const res = await service.users.update(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 批量删除 用户
   * @description 批量删除 用户
   * @router delete /api/v1/users
   * @request body userDelBodyReq
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.userDelBodyReq, ctx.request.body);
    const res = await service.users.destroy(ctx.request.body);
    res ? ctx.helper.body.NO_CONTENT({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @summary 登录
   * @description 登录
   * @router post /api/v1/users/login
   * @request body userBodyReq
   */
  async login() {
    const { ctx, service, app } = this;
    const beforeParams = {
      username: ctx.rule.userBodyReq.username,
      password: {
        type: 'string',
        required: true,
        trim: true,
      },
    };
    const params = {
      username: ctx.rule.userBodyReq.username,
      password: ctx.rule.userBodyReq.password,
    };
    ctx.validate(beforeParams, ctx.request.body);

    // 如果不是开发环境 获取配置中的rsa私钥对密码解密
    if (app.config.env === 'prod') {
      try {
        const { rsa_private_key } = await ctx.model.Configurations.findOne({
          where: { id: 1 },
        });
        const key = new NodeRSA(rsa_private_key);
        ctx.request.body.password = key.decrypt(ctx.request.body.password, 'utf8');
      } catch (e) {
        ctx.helper.body.UNAUTHORIZED({ ctx });
        return app.logger.errorAndSentry(e);
      }
    }

    ctx.validate(params, ctx.request.body);
    const res = await service.users.login(ctx.request.body);
    switch (res.__code_wrong) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res });
        break;
      case 40000:
        ctx.helper.body.INVALID_REQUEST({ ctx, code: 40000, msg: '密码错误' });
        break;
      case 40004:
        ctx.helper.body.INVALID_REQUEST({
          ctx,
          code: 40004,
          msg: '用户不存在',
        });
        break;
      case 40005:
        ctx.helper.body.INVALID_REQUEST({
          ctx,
          code: 40005,
          msg: '账号已停用',
        });
        break;
      default:
        ctx.helper.body.UNAUTHORIZED({ ctx });
        break;
    }
  }

  /**
   * @summary 登出
   * @description 登出
   * @router post /api/v1/users/logout
   */
  async logout() {
    const { ctx, app, service } = this;
    // 如果验证方式是jwt，否则为session
    if (app.config.verification_mode === 'jwt') {
      const res = await service.users.logout();
      if (res !== 'OK') app.logger.error(res);
      ctx.helper.body.SUCCESS({ ctx });
    } else {
      ctx.session = null;
      ctx.helper.body.SUCCESS({ ctx });
    }
  }

  /**
   * @apikey
   * @summary 获取 用户信息
   * @description 获取 用户信息
   * @router get /api/v1/users/user_info
   */
  async userInfo() {
    const { ctx, service } = this;
    const res = await service.users.userInfo();
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @summary 获取 是否存在此用户字段
   * @description 获取 是否存在此用户字段
   * @router get /api/v1/users/exists_user_unique_fields
   */
  async existsUserUniqueFields() {
    const { ctx, service } = this;
    const params = {
      username: {
        ...ctx.rule.userBodyReq.username,
        required: false,
      },
      nickname: {
        ...ctx.rule.userBodyReq.nickname,
        required: false,
      },
      email: {
        ...ctx.rule.userBodyReq.email,
        required: false,
      },
      phone: {
        ...ctx.rule.userBodyReq.phone,
        required: false,
      },
    };
    ctx.validate(params, ctx.query);
    const res = await service.users.existsUserUniqueFields(ctx.query);
    res ? ctx.helper.body.SUCCESS({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @summary 修改 用户密码
   * @description 修改 用户密码
   * @router put /api/v1/users/password
   * @request body userUpdatePasswordBodyReq
   */
  async updateUserPassword() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.userUpdatePasswordBodyReq, ctx.request.body);
    const res = await service.users.updateUserPassword(ctx.request.body);
    if (!res.__code_wrong) {
      ctx.helper.body.SUCCESS({ ctx });
    } else {
      ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: res.message });
    }
  }

  /**
   * @apikey
   * @summary 修改 用户所属部门
   * @description 修改 用户所属部门
   * @router put /api/v1/users/department
   * @request body updateUserDepartmentBodyReq
   */
  async updateUserDepartment() {
    const { ctx, service } = this;
    const params = {
      id: {
        ...ctx.rule.userPutBodyReq.id,
      },
      department_id: {
        ...ctx.rule.userPutBodyReq.department_id,
        required: true,
      },
    };
    ctx.validate(params, ctx.request.body);
    const res = await service.users.updateUserDepartment(ctx.request.body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.INVALID_REQUEST({ ctx });
  }

  /**
   * @summary 刷新token
   * @description 刷新token
   * @router post /api/v1/users/refreshToken
   */
  async refreshToken() {
    const { ctx, app, service } = this;
    const params = {
      refreshToken: {
        type: 'string',
        required: true,
        trim: true,
        example: '',
        description: 'refreshToken',
      },
      secret: {
        type: 'string',
        required: true,
        trim: true,
        example: '',
        description: '秘钥',
      },
    };
    ctx.validate(params, ctx.request.body);
    // 如果验证方式是jwt，否则为session
    if (app.config.verification_mode === 'jwt') {
      const res = await service.users.refreshToken(ctx.request.body);
      switch (res.__code_wrong) {
        case undefined:
          ctx.helper.body.SUCCESS({ ctx, res });
          break;
        case 40000:
        case 40001:
        case 40002:
        case 40003:
          ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: res.message });
          break;
        default:
          ctx.helper.body.INVALID_REQUEST({ ctx });
          break;
      }
    } else {
      ctx.helper.body.INVALID_REQUEST({ ctx });
    }
  }

  /**
   * @summary github授权登录
   * @description github授权登录
   * @router post /api/v1/users/github/login
   */
  async githubLogin() {
    const {
      ctx,
      service,
      app,
      app: {
        config: { github },
      },
    } = this;
    ctx.validate(ctx.rule.userGithubReq, ctx.request.body);
    const { code } = ctx.request.body;
    try {
      const result = await ctx.curl(github.access_token_url, {
        method: 'POST',
        contentType: 'application/json',
        data: {
          ...github,
          code,
        },
        dataType: 'json',
        timeout: 10000,
      });
      if (result.data.error) {
        ctx.helper.body.UNAUTHORIZED({ ctx, res: result.data });
      } else {
        const userInfo = await ctx.curl(github.user_info_url, {
          method: 'GET',
          headers: {
            Authorization: `token ${result.data.access_token}`,
          },
          contentType: 'application/json',
          dataType: 'json',
          timeout: 10000,
        });
        if (userInfo.data.error) {
          ctx.helper.body.UNAUTHORIZED({ ctx, res: result.data });
        }
        const res = await service.users.githubLogin(userInfo.data);
        switch (res.__code_wrong) {
          case undefined:
            ctx.helper.body.SUCCESS({ ctx, res });
            break;
          case 40000:
            ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: '用户创建失败' });
            break;
          case 40002:
            ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: '用户已存在' });
            break;
          case 40005:
            ctx.helper.body.INVALID_REQUEST({
              ctx,
              code: res.__code_wrong,
              msg: '账号已停用',
            });
            break;
          default:
            ctx.helper.body.UNAUTHORIZED({ ctx });
            break;
        }
      }
    } catch (e) {
      ctx.helper.body.UNAUTHORIZED({ ctx, res: e.res });
      app.logger.errorAndSentry(e);
    }
  }
}

module.exports = RoleController;
