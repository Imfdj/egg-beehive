'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async ping() {
    const { ctx, app } = this;
    console.log('ping');
    const message = ctx.args[0];
    await ctx.socket.emit('res', `Hi! I've got your message: ${ message }`);
  }

  async ack() {
    const { ctx, app } = this;
    console.log('ack');
    const message = ctx.args[0];
    console.log(message);
    await app.redis.del(ctx.helper.redisKeys.socketBaseSocketId(message.id));
  }

}

module.exports = DefaultController;
