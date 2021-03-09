'use strict';
const lodash = require('lodash');

module.exports = {
  schedule: {
    interval: 1000 * 2, // 2s间隔
    type: 'worker', // 指定所有的 worker 都需要执行
    disable: false, // 配置该参数为 true 时，这个定时任务不会被启动。
    immediate: false, // 配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
  },
  async task(ctx) {
    const { app: { redis, io }, helper } = ctx;
    const socketKeys = await redis.keys(helper.redisKeys.socketBaseSocketId('*'));
    // console.log('------------------------');
    // console.log(socketKeys);
    // console.log(ctx.app.socketIdOnRedisKeys);
    // 同上一次获取比较，相同的key代表最少2秒，最多4秒没有收到ACK反馈，则重发
    // 没有直接获取到就重发，是为了，避免小于2秒存入的重发。
    const intersection = lodash.intersection(ctx.app.socketIdOnRedisKeys, socketKeys);
    // const data = await redis.mget(...intersection);
    const nsp = io.of('/socketIo');
    console.log(nsp.adapter.rooms);
    try {
      intersection.forEach(id => {
        redis.get(id, (err, data) => {
          if (!err) {
            const _data = JSON.parse(data);
            const socket = nsp.to(_data.clientId);
            socket.emit('message', _data);
          }
        });
      });
    } catch (e) {
      throw e;
    }
    // 本次覆盖存入
    ctx.app.socketIdOnRedisKeys = socketKeys;
  },
};
