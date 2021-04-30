'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
      // 如果是开发环境或者是生产环境 存储操作日志
      if (app.config.env === 'prod' || app.config.env === 'local') {
        const payload = {
          operator_id: ctx.currentRequestData.userInfo.id,
          method: ctx.request.method,
          url: ctx.request.url.split('?')[0],
          ip: ctx.request.ip,
          status: ctx.response.status,
          params: ctx.request.method.toLocaleUpperCase() === 'GET' ? JSON.stringify(ctx.request.query) : JSON.stringify(ctx.request.body),
        };
        ctx.service.operationLogs.create(payload);
      }
    } catch (err) {
      app.logger.errorAndSentry(err);
    }
  };
};
