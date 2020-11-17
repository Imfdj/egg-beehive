'use strict';

const Controller = require('egg').Controller;
const NodeRSA = require('node-rsa');

/**
 * @controller 用户 user
 */

class RoleController extends Controller {

  /**
   * @apikey
   * @summary 获取 用户
   * @description 获取 用户
   * @request query string username 用户名
   * @request query string email 邮箱
   * @request query string phone 手机
   * @request query number limit limit
   * @request query number offset offset
   * @router get /api/v1/users/list
   */
  async findAll() {
    const { ctx, service } = this;
    const params = {
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
      prop_order: {
        type: 'enum',
        required: false,
        values: [ ...Object.keys(ctx.rule.userPutBodyReq), '' ],
      },
      order: {
        type: 'enum',
        required: false,
        values: [ 'desc', 'asc', '' ],
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
        values: [ 1, 2 ],
      },
    };
    ctx.validate(params, ctx.request.body);
    const res = await ctx.service.users.create(ctx.request.body);
    res ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.INVALID_REQUEST({ ctx, code: 10000 });
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
    res && res[ 0 ] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
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
    const { ctx, service } = this;
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
    // 获取配置中的rsa私钥对密码解密
    try {
      const { rsa_private_key } = await ctx.model.Configurations.findOne({ where: { id: 1 } });
      const key = new NodeRSA(rsa_private_key);
      ctx.request.body.password = key.decrypt(ctx.request.body.password, 'utf8');
    } catch (e) {
      ctx.helper.body.UNAUTHORIZED({ ctx });
      return ctx.logger.error(e);
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
        ctx.helper.body.INVALID_REQUEST({ ctx, code: 40004, msg: '用户不存在' });
        break;
      case 40005:
        ctx.helper.body.INVALID_REQUEST({ ctx, code: 40005, msg: '账号已停用' });
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
      if (res !== 'OK') ctx.logger.error(res);
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
    switch (res.__code_wrong) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx });
        break;
      case 40000:
        ctx.helper.body.INVALID_REQUEST({ ctx, code: 40000, msg: res.message });
        break;
      case 40004:
        ctx.helper.body.INVALID_REQUEST({ ctx, code: 40004, msg: res.message });
        break;
      default:
        ctx.helper.body.INVALID_REQUEST({ ctx });
        break;
    }
  }
}

module.exports = RoleController;
