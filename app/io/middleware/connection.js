'use strict';

module.exports = app => {
  return async (ctx, next) => {
    const { socket, logger } = ctx;
    const nsp = app.io.of('/socketIo');
    console.log('start connection!');
    console.log('allSockets');
    // console.log(socket.rooms);
    // console.log(app.io.of('/socketIo').name);
    // console.log(app.io.of('/socketIo').connected);
    // console.log(app.io.of('/socketIo').rooms);
    try {
      const { accessToken, userId } = socket.handshake.query;
      const token = accessToken.split('Bearer ')[1];
      // 如果token 不存在，或者在redis黑名单，则断开连接
      if (!token || (await app.redis.exists(accessToken)) === 1) {
        socket.disconnect();
      }
      await app.jwt.verify(token, app.config.jwt.secret);

      // 获取用户参与的项目，根据项目ID创建room
      const userProjects = await ctx.model.UserProjects.findAll({
        where: { user_id: userId },
        attributes: ['project_id'],
      });
      userProjects.forEach(item => {
        const roomName = `${ app.config.socketProjectRoomNamePrefix }${ item.project_id }`;
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
      logger.error(err);
      socket.emit('disconnect', 'disconnect!');
      socket.disconnect();
    }
    await next();
    console.log('disconnect!');
    console.log(socket.id);
    // nsp.adapter.rooms.forEach(room => {
    //   socket.leave(room);
    // });
  };
};
