'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const message = app.model.define(
    'messages',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      actor_id: Sequelize.INTEGER(11),
      receiver_id: Sequelize.INTEGER(11),
      content: Sequelize.TEXT,
      is_read: Sequelize.TINYINT(1),
      type: Sequelize.STRING(30),
      url: Sequelize.STRING(255),
    },
    {}
  );

  message.addHook('afterCreate', async (message, options) => {
    const ctx = await app.createAnonymousContext();
    // 发送socket消息
    const newMessage = Object.assign({
      is_read: 0,
      url: '',
    }, message.dataValues);
    const nsp = app.io.of('/');
    const { receiver_id, type } = message;
    nsp.clients((error, clients) => {
      if (error) throw error;
      // 当此用户在线，则发送消息
      if (clients.includes(receiver_id.toString())) {
        const socket = nsp.to(receiver_id);
        const _message = ctx.helper.parseSocketMsg(newMessage, receiver_id, type);
        const emitData = ['message', _message];
        socket.emit(...emitData);
        // 存入redis，接收到ACK则删除，否则在 this.app.config.socketRedisExp 时间内多次重发
        app.redis.setex(ctx.helper.redisKeys.socketBaseSocketId(_message.id), app.config.socketRedisExp, JSON.stringify(emitData));
      }
    });
  });

  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};
