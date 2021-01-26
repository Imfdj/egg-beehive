'use strict';
const crypto = require('crypto');

module.exports.tools = {
  // 根据ID验证数据是否存在；存在则返回对象，不存在则抛出404。
  async findByPkSequelize(ctx, target, id) {
    const item = await ctx.model[target].findByPk(id);
    return !item ? ctx.helper.NOT_FOUND({ ctx }) : item;
  },

  // 密码“加盐”
  async saltPassword(password, salt = crypto.createHash('md5')
    .update(Math.random()
      .toString())
    .digest('hex')) {
    const password_finally = crypto
      .createHash('md5')
      .update(password + ':' + salt)
      .digest('hex');
    return {
      salt,
      password: password_finally,
    };
  },

  async apply(ctx, params = {}, exp = 60, secret = ctx.app.config.jwt.secret) {
    return ctx.app.jwt.sign(
      {
        data: params,
        // exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        exp: Math.floor(Date.now() / 1000) + exp,
        // exp: Math.floor(Date.now() / 1000) + (10),
      },
      secret
    );
  },

  isParam(param) {
    return !param && param !== 0;
  },
};

module.exports.body = {
  // [GET]：服务器成功返回用户请求的数据
  SUCCESS({ ctx, res = null, msg = '请求成功', code = 0 }) {
    ctx.body = {
      code,
      data: res,
      msg,
    };
    ctx.status = 200;
  },

  // [POST/PUT/PATCH]：用户新建或修改数据成功。
  CREATED_UPDATE({ ctx, res = null, msg = '新建或修改数据成功' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
    };
    ctx.status = 201;
  },

  /*
   * @description [DELETE]：用户删除数据成功。
   */
  NO_CONTENT({ ctx, res = null, msg = '删除数据成功' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
    };
    ctx.status = 204;
  },

  // [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作
  INVALID_REQUEST({ ctx, res = null, msg = '请求有错误，服务器没有进行新建、修改、删除数据的操作', code = 400, status = 400 }) {
    ctx.body = {
      code,
      data: res,
      msg,
    };
    ctx.status = status;
  },

  // [*]：表示用户没有认证（令牌、用户名、密码错误）。
  UNAUTHORIZED({ ctx, res = null, msg = '没有认证（令牌、用户名、密码错误）', status = 401 }) {
    ctx.body = {
      code: 401,
      data: res,
      msg,
    };
    ctx.status = status;
  },

  // [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
  FORBIDDEN({ ctx, res = null, msg = '权限不足，访问被禁止' }) {
    ctx.body = {
      code: 403,
      data: res,
      msg,
    };
    ctx.status = 403;
  },

  // [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作
  NOT_FOUND({ ctx, res = null, msg = '资源未找到', status = 200 }) {
    ctx.body = {
      code: 404,
      data: res,
      msg,
    };
    ctx.status = status;
  },

  // [*] 参数发生验证错误。
  VALIDATION_FAILED({ ctx, res = null, msg = '参数发生验证错误' }) {
    ctx.body = {
      code: 422,
      data: res,
      msg,
    };
    ctx.status = 422;
  },
};

module.exports.redisKeys = {
  // 资源基于action和url存储到redis中的key
  permissionsBaseActionUrl(action = '', url = '') {
    return `permissions:action:${action}:url:${url}`;
  },
  // 角色资源基于roleId存储到redis中的key
  rolePermissionsBaseRoleId(id = '') {
    return `rolePermissions:roleId:${id}`;
  },
  // 用户拥有的所有角色id，基于userId存储到redis中的key
  userRoleIdsBaseUserId(id = '') {
    return `userRoleIds:userId:${id}`;
  },
};
