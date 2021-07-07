'use strict';

module.exports = app => {
  return async (ctx, next) => {
    const {
      packet,
      app: { redis },
    } = ctx;
    // ctx.socket.emit('packet', 'packet received!');
    // if (packet && packet[0] === 'ack') {
    //   await redis.del('12341234');
    // }
    await next();
  };
};
