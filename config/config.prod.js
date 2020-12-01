'use strict';

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 33066,
  password: '123123',
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
  // dir: 'E:/project-E/node/egg/egg-beehive/logs/egg-beehive/prod',
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
