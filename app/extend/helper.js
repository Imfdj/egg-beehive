'use strict';
const crypto = require('crypto');
const lodash = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

module.exports = {
  /**
   * socket消息规则解析
   */
  parseSocketMsg(params, clientId, action, method = 'publish') {
    const data = {
      id: uuidv4(),
      clientId,
      action,
      method,
      params,
    };
    return data;
  },
  /**
   * 发送socket消息给room里的每个连接,并录入redis
   */
  async sendSocketToClientOfRoom(params, action, project_id = params.project_id, messageType = 'sync', method = 'publish') {
    const { ctx, app, redisKeys } = this;
    const nsp = app.io.of('/');
    let roomName = '';
    // 如果项目ID不存在，则向在线用户room广播
    if (project_id) {
      const project = await ctx.model.Projects.findOne({ where: { id: project_id, is_private: 1 } });
      // 如果项目是私有的，则向项目room广播，否则向在线用户room广播
      if (project) {
        roomName = `${this.app.config.socketProjectRoomNamePrefix}${project_id}`;
      } else {
        roomName = app.config.socketOnlineUserRoomName;
      }
    } else {
      roomName = app.config.socketOnlineUserRoomName;
    }
    try {
      nsp.adapter.clients([roomName], (err, clients) => {
        clients.forEach(clientId => {
          const data = ctx.helper.parseSocketMsg(params, clientId, action, method);
          const socket = nsp.to(clientId);
          const emitData = [messageType, data];
          socket.emit(...emitData);
          // 存入redis，接收到ACK则删除，否则在 this.app.config.socketRedisExp 时间内多次重发
          app.redis.setex(redisKeys.socketBaseSocketId(data.id), app.config.socketRedisExp, JSON.stringify(emitData));
        });
      });
    } catch (e) {
      app.logger.errorAndSentry(e);
    }
  },
  /**
   * 给单个socket发送消息,并录入redis
   */
  sendMessageToSocket(userId, params, action, messageType = 'sync', method = 'publish') {
    const { ctx, app, redisKeys } = this;
    const nsp = app.io.of('/');
    nsp.adapter.clients((err, clients) => {
      if (err) {
        app.logger.errorAndSentry(err);
        return;
      }
      clients.forEach(clientId => {
        // 正则userID_uuid，给同一个用户多个socket分别发送消息
        const rex = new RegExp(`^${userId}_.*`);
        if (rex.test(clientId)) {
          try {
            const socket = nsp.to(clientId);
            // 当此用户在线，则发送消息
            if (socket) {
              const _message = ctx.helper.parseSocketMsg(params, clientId, action, method);
              const emitData = [messageType, _message];
              socket.emit(...emitData);
              // 存入redis，接收到ACK则删除，否则在 this.app.config.socketRedisExp 时间内多次重发
              app.redis.setex(redisKeys.socketBaseSocketId(_message.id), app.config.socketRedisExp, JSON.stringify(emitData));
            }
          } catch (e) {
            app.logger.errorAndSentry(e);
          }
        }
      });
    });
  },
};

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

  /**
   * findAll请求根据rule处理query值
   * @param rule 规则
   * @param queryOrigin 原请求参数
   * @param ruleOther 追加规则
   * @param findAllParamsOther 追加搜索字段
   * @param keywordLikeExcludeParams 关键字keyword模糊搜索排除字段
   * @return {{query: {where: {}}, allRule: {offset: {default: number, type: string, required: boolean}, prop_order: {values, type: string, required: boolean}, limit: {type: string, required: boolean}, order: {values: [string, string, string], type: string, required: boolean}}}}
   */
  findAllParamsDeal(options) {
    const { rule, queryOrigin, ruleOther = {}, findAllParamsOther = {}, keywordLikeExcludeParams = [] } = options;
    const _rule = lodash.cloneDeep(rule);
    const query = {
      where: {},
    };
    for (const ruleKey in _rule) {
      _rule[ruleKey].required = false;
    }
    const findAllParams = {
      keyword: {
        type: 'string',
        trim: true,
        required: false,
        max: 36,
      },
      prop_order: {
        type: 'enum',
        required: false,
        values: [...Object.keys(_rule), ''],
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
      ...findAllParamsOther,
    };
    const allRule = {
      ..._rule,
      ...ruleOther,
      ...findAllParams,
    };
    // 根据rule处理query，剔除非rule检查字段
    for (const queryKey in queryOrigin) {
      if (_rule.hasOwnProperty(queryKey)) {
        query.where[queryKey] = queryOrigin[queryKey];
      }
      if (allRule.hasOwnProperty(queryKey)) {
        query[queryKey] = queryOrigin[queryKey];
      }
    }
    // 如果搜索参数queryOrigin中带有keyword，且不为空字符串，则视keyword为模糊搜索
    if (queryOrigin.hasOwnProperty('keyword') && queryOrigin.keyword.trim() !== '') {
      query.where[Op.or] = [];
      for (const queryKey in _rule) {
        // 非模糊搜索排除字段的所有rule中的字段, 且数据类型为string，做模糊查询
        if (!keywordLikeExcludeParams.includes(queryKey) && _rule[queryKey].type === 'string') {
          query.where[Op.or].push({ [queryKey]: { [Op.like]: `%${queryOrigin.keyword.trim()}%` } });
        }
      }
    }

    return {
      allRule,
      query,
    };
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
  // socket发送后基于ID存储到redis中的key
  socketBaseSocketId(id = '') {
    return `socket:Id:${id}`;
  },
};
