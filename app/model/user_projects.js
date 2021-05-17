'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const user_project = app.model.define(
    'user_projects',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
    },
    {}
  );
  user_project.addHook('afterCreate', async (userProject, options) => {
    const { user_id, project_id } = userProject;
    const roomName = `${app.config.socketProjectRoomNamePrefix}${project_id}`;
    const nsp = app.io.of('/');
    const rex = new RegExp(`^${user_id}_.*`);
    nsp.adapter.clients((err, clients) => {
      if (err) {
        app.logger.errorAndSentry(err);
        return;
      }
      clients.forEach(clientId => {
        // 正则userID_uuid，给同一个用户多个socket分别发送消息
        if (rex.test(clientId)) {
          try {
            const socket = nsp.sockets[clientId];
            // const socket = nsp.to(clientId);
            // 当此用户在线，则将用户加入此项目room
            socket && socket.join(roomName, () => {});
          } catch (e) {
            app.logger.errorAndSentry(e);
          }
        }
      });
    });
    // const socket = nsp.sockets[user_id];
    // 将用户加入此项目room
    // socket && socket.join(roomName, () => {});
    // 发送socket消息
    // ctx.helper.sendMessageToSocket(receiver_id, userProject, 'create:userProject');
  });
  user_project.associate = function(models) {
    // associations can be defined here
  };
  return user_project;
};
