'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_working_hour = app.model.define(
    'task_working_hours',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      description: Sequelize.STRING(255),
      work_time: Sequelize.INTEGER(11),
      task_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
      executor_id: Sequelize.INTEGER(11),
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
    },
    {

    }
  );

  task_working_hour.addHook('afterCreate', async (task_working_hour, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_working_hour, 'create:task_working_hour');
  });
  task_working_hour.addHook('afterUpdate', async (task_working_hour, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_working_hour, 'update:task_working_hour');
  });
  task_working_hour.addHook('afterDestroy', async (task_working_hour, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_working_hour, 'delete:task_working_hour');
  });

  task_working_hour.associate = function(models) {
    task_working_hour.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'executor_id', as: 'executor' });
    // associations can be defined here
  };
  return task_working_hour;
};
