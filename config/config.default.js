/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1578362616760_8753,${appInfo.name}_1578362616760_8754`;

  // add your middleware config here
  config.middleware = ['jurisdictionHandler', 'errorHandler'];

  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      enable: true,
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        return ['/api/v1/users/login', '/api/v1/users/logout'].includes(ctx.request.url);
      },
    },
    // domainWhiteList: ['http://localhost:8000'],
  };

  config.bodyParser = {
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      json: 'application/custom-json',
      // json: 'application/json',
      text: ['application/xml', 'text/xml', 'text/html'],
    },
  };

  config.jwt = {
    secret: 'Great4-M',
    secret_refresh: 'Great4-M-refresh',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  config.validate = {
    // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };

  config.swaggerdoc = {
    basePath: '/',
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-beehive',
      description: 'egg-beehive api doc',
      version: '1.0.0',
    },
    schemes: ['http'],
    enable: true,
    routerMap: false,
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      oauth2: {
        type: 'oauth2',
        tokenUrl: 'http://127.0.0.1:7002/api/v1/users/login',
        flow: 'password',
        scopes: {
          'write:access_token': 'write access_token',
          'read:access_token': 'read access_token',
        },
      },
    },
    enableSecurity: true,
  };

  config.healthy = {
    readinessPath: '/api/readiness',
    livenessPath: '/api/liveness',
  };

  config.session = {
    maxAge: 24 * 3600 * 1000, // ms
    // maxAge: 20 * 1000, // ms
    key: 'EGG_SESS',
    httpOnly: true,
    signed: false,
    encrypt: false,
    renew: true,
    // sameSite: null,
  };

  config.mailer = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '298242069@qq.com', // generated ethereal user
      pass: 'nlmxmejjesswbjfh', // generated ethereal password
    },
  };

  config.multipart = {
    whitelist: [
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ],
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, `../eggStatic/${appInfo.name}/public`),
    upload_dir: 'uploads',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    verification_mode: 'jwt',
    jwt_exp: 60 * 10, // jwt过期时间(秒)
    jwt_refresh_exp: 60 * 60 * 24 * 15, // refreshToken过期时间(秒)
  };

  return {
    ...config,
    ...userConfig,
  };
};
