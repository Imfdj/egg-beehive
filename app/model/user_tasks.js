'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const user_task = app.model.define(
    'user_tasks',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER(11),
      task_id: Sequelize.INTEGER(11),
    },
    {}
  );

  user_task.addHook('afterCreate', async (user_task, options) => {
    const ctx = await app.createAnonymousContext();
    const user = await app.model.Users.findOne({ where: { id: user_task.user_id } });
    const task = await app.model.Tasks.findOne({ where: { id: user_task.task_id } }) || {}; // TODO
    ctx.helper.sendSocketToClientOfRoom(user, 'create:user_task', task.project_id);
  });
  user_task.addHook('afterDestroy', async (user_task, options) => {
    const ctx = await app.createAnonymousContext();
    const task = await app.model.Tasks.findOne({ where: { id: user_task.task_id } });
    ctx.helper.sendSocketToClientOfRoom(user_task, 'delete:user_task', task.project_id);
  });

  user_task.associate = function(models) {
    // associations can be defined here
  };
  return user_task;
};
