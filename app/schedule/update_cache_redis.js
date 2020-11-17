'use strict';

const { permissionsToRedis } = require('../../app-boot-hook-do');

module.exports = {
  schedule: {
    interval: 1000 * 60 * 5, // 5 分钟间隔
    type: 'worker', // 指定所有的 worker 都需要执行
    disable: false, // 配置该参数为 true 时，这个定时任务不会被启动。
    immediate: false, // 配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
  },
  async task(ctx) {
    // 资源数据缓存到redis
    await permissionsToRedis(ctx.app);
  },
};
