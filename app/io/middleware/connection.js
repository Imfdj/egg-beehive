'use strict';

module.exports = app => {
  return async (ctx, next) => {
    const { socket, logger } = ctx;
    const { socketOnlineUserRoomName } = app.config;
    const nsp = app.io.of('/');
    console.log('start connection!');
    console.log('allSockets');
    // console.log(socket.rooms);
    // console.log(app.io.of('/').name);
    // console.log(app.io.of('/').connected);
    // console.log(app.io.of('/').rooms);
    try {
      const { accessToken, userId } = socket.handshake.query;
      const token = accessToken.split('Bearer ')[1];
      // 如果token 不存在，或者在redis黑名单，则断开连接
      if (!token || (await app.redis.exists(accessToken)) === 1) {
        socket.disconnect();
      }
      await app.jwt.verify(token, app.config.jwt.secret);
      // 加入在线用户room
      socket.join(socketOnlineUserRoomName, () => {
        setTimeout(() => {
          // 给已在线用户发送join
          ctx.helper.sendSocketToClientOfRoom({ socketId: socket.id }, 'join');
          nsp.adapter.clients([socketOnlineUserRoomName], (err, clients) => {
            if (err) logger.error(err);
            const ids = new Set(clients);
            ids.add(socket.id);
            // 发送当前在线用户ids
            const _message = ctx.helper.parseSocketMsg(Array.from(ids), socket.id, 'online');
            const emitData = ['sync', _message];
            socket.emit(...emitData);
            // 存入redis，接收到ACK则删除，否则在 this.app.config.socketRedisExp 时间内多次重发
            app.redis.setex(ctx.helper.redisKeys.socketBaseSocketId(_message.id), app.config.socketRedisExp, JSON.stringify(emitData));
            // socket.emit('online', Array.from(ids));
          });
        });
      });
      // 获取用户参与的项目，根据项目ID创建room
      const userProjects = await ctx.model.UserProjects.findAll({
        where: { user_id: userId },
        attributes: ['project_id'],
      });
      userProjects.forEach(item => {
        const roomName = `${app.config.socketProjectRoomNamePrefix}${item.project_id}`;
        socket.join(roomName, () => {
          // setTimeout(() => {
          //   nsp.to(roomName).emit(`a new user has joined the room: ${ socket.id }`);
          //   nsp.adapter.clients([roomName], (err, clients) => {
          //     if (err) logger.error(err);
          //     console.log(clients);
          //
          //     // 更新在线用户列表
          //     // nsp.to(room).emit('online', {
          //     //   clients,
          //     //   action: 'join',
          //     //   target: 'participator',
          //     //   message: `User(${id}) joined.`,
          //     // });
          //   });
          // });
        });
      });
    } catch (err) {
      app.logger.errorAndSentry(err);
      socket.emit('disconnect', 'disconnect!');
      socket.disconnect();
    }
    await next();
    console.log('disconnect!');
    console.log(socket.id);
    socket.join(socketOnlineUserRoomName, () => {
      setTimeout(() => {
        ctx.helper.sendSocketToClientOfRoom({ socketId: socket.id }, 'leave');
      });
    });
  };
};
