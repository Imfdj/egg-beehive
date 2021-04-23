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
    const socket = nsp.sockets[user_id];
    // 将用户加入此项目room
    socket && socket.join(roomName, () => {});
    // 发送socket消息
    // ctx.helper.sendMessageToSocket(receiver_id, userProject, 'create:userProject');
  });
  user_project.associate = function(models) {
    // associations can be defined here
  };
  return user_project;
};
