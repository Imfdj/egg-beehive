'use strict';
const lodash = require('lodash');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');
const { permissionsToRedis } = require('./app-boot-hook-do');
const Sentry = require('@sentry/node');

class AppBootHook {
  constructor(app) {
    this.app = app;
    // app.running_status 供健康监测接口使用。
    app.running_status = true;
    process.on('SIGINT', () => {
      app.running_status = false;
    });
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    // 例如：参数中的密码是加密的，在此处进行解密
    // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    // const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    // this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    // 例如：创建自定义应用的示例
    // this.app.queue = new Queue(this.app.config.queue);
    // await this.app.queue.init();
    // 例如：加载自定义的目录
    // this.app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
    //   fieldClass: 'tasksClasses',
    // });
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    // this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);

    Sentry.init({
      dsn: this.app.config.sentry.dsn || '',
    });
    // logger记录error并在prod环境下发送错误到Sentry
    this.app.logger.errorAndSentry = (msg, ...arg) => {
      this.app.config.env === 'prod' ? Sentry.captureException(msg) : null;
      this.app.logger.error(msg, ...arg);
    };
    this.app.lodash = lodash;
    this.app.uuidv4 = uuidv4;
    this.app.dayjs = dayjs;
    console.log('willReady');
    console.time('willReady');
    const { Sequelize } = this.app.model;
    // 资源数据缓存到redis
    await permissionsToRedis(this.app);

    Sequelize.addHook('afterBulkUpdate', options => {
      // 做些什么
    });
  }

  async didReady() {
    // 应用已经启动完毕
    console.log('didReady');
    console.timeEnd('willReady');
    // const ctx = await this.app.createAnonymousContext();
    // await ctx.service.Biz.request();

    // 如果没有uploads文件夹，则创建
    const { dir, upload_dir } = this.app.config.static;
    const public_uploads = path.join(dir, upload_dir);
    this.app.config.static.public_uploads_path = public_uploads;
    if (!fs.existsSync(public_uploads)) {
      fs.mkdirSync(public_uploads, { recursive: true });
    }
  }

  async serverDidReady() {
    console.log('serverDidReady');
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    this.app.server.on('timeout', socket => {
      // handle socket timeout
    });
  }
}

module.exports = AppBootHook;
