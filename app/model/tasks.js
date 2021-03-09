'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task = app.model.define(
    'tasks',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.TEXT('tiny'),
      creator_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
      parent_id: Sequelize.INTEGER(11),
      task_list_id: Sequelize.INTEGER(11),
      task_state_id: Sequelize.INTEGER(11),
      task_type_id: Sequelize.INTEGER(11),
      task_priority_id: Sequelize.INTEGER(11),
      executor_id: Sequelize.INTEGER(11),
      start_date: Sequelize.STRING(30),
      end_date: Sequelize.STRING(30),
      remark: Sequelize.TEXT('medium'),
      is_done: Sequelize.TINYINT(1),
      is_privacy: Sequelize.TINYINT(1),
      is_recycle: Sequelize.TINYINT(1),
      likes: Sequelize.INTEGER(11),
      plan_work_hours: Sequelize.INTEGER(11),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  task.addHook('afterCreate', async (task, options) => {
    const ctx = await app.createAnonymousContext();
    // const newTask = await app.model.Tasks.findOne({
    //   where: { id: task.id },
    // });
    const newTask = Object.assign({
      parent_id: 0,
      executor_id: 0,
      start_date: '',
      end_date: '',
      remark: '',
      is_done: 0,
      is_privacy: 0,
      is_recycle: 0,
      likes: 0,
      plan_work_hours: 0,
    }, task.dataValues);
    const roomName = `${ app.config.socketProjectRoomNamePrefix }${ task.project_id }`;
    const nsp = app.io.of('/socketIo');
    // app.io.of('/socketIo').to(roomName).emit(newTask); // broadcast to everyone in the room
    nsp.adapter.clients([roomName], (err, clients) => {
      clients.forEach(clientId => {
        const data = ctx.helper.parseSocketMsg(newTask, clientId, 'create:task');
        const socket = nsp.to(clientId);
        socket.emit('message', data);
      });
    });
  });
  task.addHook('afterUpdate', async (task, options) => {
    const ctx = await app.createAnonymousContext();
    const roomName = `${ app.config.socketProjectRoomNamePrefix }${ task.project_id }`;
    const nsp = app.io.of('/socketIo');
    nsp.adapter.clients([roomName], (err, clients) => {
      clients.forEach(clientId => {
        const data = ctx.helper.parseSocketMsg(task, clientId, 'update:task');
        const socket = nsp.to(clientId);
        socket.emit('message', data);
      });
    });
  });

  task.addHook('afterDestroy', async (task, options) => {
    const ctx = await app.createAnonymousContext();
    const roomName = `${ app.config.socketProjectRoomNamePrefix }${ task.project_id }`;
    const nsp = app.io.of('/socketIo');
    nsp.adapter.clients([roomName], (err, clients) => {
      clients.forEach(clientId => {
        const data = ctx.helper.parseSocketMsg(task, clientId, 'delete:task');
        const socket = nsp.to(clientId);
        socket.emit('message', data);
      });
    });
  });

  task.associate = function(models) {
    // associations can be defined here
    task.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'executor_id', as: 'executor' });
    task.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'creator_id', as: 'creator' });
    app.model.Tasks.belongsToMany(app.model.Users, {
      through: app.model.UserTasks,
      foreignKey: 'task_id',
      otherKey: 'user_id',
      as: 'participators',
    });
  };
  return task;
};