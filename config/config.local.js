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
