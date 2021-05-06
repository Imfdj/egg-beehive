'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
      // 如果是开发环境或者是生产环境且非GET 存储操作日志
      if (
        (app.config.env === 'prod' || app.config.env === 'local') &&
        ctx.request.method.toLocaleUpperCase() !== 'GET' &&
        ctx.currentRequestData &&
        ctx.currentRequestData.userInfo
      ) {
        const payload = {
          operator_id: ctx.currentRequestData.userInfo.id,
          operator_username: ctx.currentRequestData.userInfo.username,
          method: ctx.request.method,
          url: ctx.request.url.split('?')[0],
          ip: ctx.request.ip,
          status: ctx.response.status,
          params: JSON.stringify(ctx.request.body),
        };
        ctx.service.operationLogs.create(payload);
      }
    } catch (err) {
      app.logger.errorAndSentry(err);
    }
  };
};
