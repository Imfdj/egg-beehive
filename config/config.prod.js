'use strict';
const { v4: uuidv4 } = require('uuid');

exports.sequelize = {
  dialect: 'mysql',
  host: process.env.MySqlHost || '127.0.0.1',
  port: process.env.MySqlPort || 3306,
  password: process.env.MySqlPassword,
  database: 'egg-beehive-prod',
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

exports.logger = {
  // dir: '',
};

exports.cors = {
  // origin: [ 'http://192.168.6.150:8080' ],
  // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};

exports.redis = {
  client: {
    host: process.env.RedisHost || '127.0.0.1',
    port: process.env.RedisPort || 6379,
    password: process.env.RedisPassword,
    db: process.env.RedisDb || 1,
  },
};

exports.alinode = {
  appid: process.env.AlinodeAppid,
  secret: process.env.AlinodeSecret,
};

exports.github = {
  access_token_url: 'https://github.com/login/oauth/access_token',
  user_info_url: 'https://api.github.com/user',
  client_id: process.env.GithubClientId || '',
  client_secret: process.env.GithubClientSecret || '',
};

exports.oss = {
  client: {
    accessKeyId: process.env.OssAccessKeyId || '',
    accessKeySecret: process.env.OssAccessKeySecret || '',
    bucket: process.env.OssBucket || '',
    endpoint: 'oss-cn-guangzhou.aliyuncs.com',
    timeout: '60s',
  },
};

exports.io = {
  init: {},
  namespace: {
    '/': {
      connectionMiddleware: ['connection'],
      packetMiddleware: ['packet'],
    },
  },
  redis: {
    host: process.env.RedisHost || '127.0.0.1',
    port: process.env.RedisPort || 6379,
    password: process.env.RedisPassword,
    db: 3,
  },
  generateId: req => {
    return `${req._query.userId}_${uuidv4()}`;
  },
};

exports.sentry = {
  dsn: process.env.SentyDsn || '',
};
