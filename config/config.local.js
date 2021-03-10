'use strict';

exports.security = {
  csrf: {
    headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    enable: false,
    // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
    ignore: ctx => {
      return ['/api/v1/users/login', '/api/v1/users/logout'].includes(ctx.request.url);
    },
  },
  // domainWhiteList: ['http://localhost:8000'],
};

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 33066,
  password: '123123',
  database: 'egg-beehive-dev',
  timezone: '+08:00',
  define: {
    raw: true,
    underscored: false,
    charset: 'utf8',
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    // collate: 'utf8_general_ci',
  },
};

exports.cors = {
  // origin: [ 'http://192.168.6.150:8080' ],
  // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};

exports.redis = {
  client: {
    port: 6379,
    host: '127.0.0.1',
    password: '123123',
    db: 1,
  },
};

exports.jwt_exp = 60 * 60 * 24 * 15; // 开发环境下，jwt过期时间(秒)

exports.io = {
  init: {
    // transports: ['websocket'],
    // pingInterval: 5000,
    // allowEIO3: true,
  }, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: ['connection'],
      packetMiddleware: ['packet'],
    },
  },
  generateId: req => { // 自定义 socket.id 生成函数
    // const data = qs.parse(req.url.split('?')[1]);
    return req._query.userId; // custom id must be unique
  },
};
