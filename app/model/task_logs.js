'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_log = app.model.define(
    'task_logs',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      remark: Sequelize.STRING(255),
      task_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
      operator_id: Sequelize.INTEGER(11),
      icon: Sequelize.STRING(60),
      content: Sequelize.TEXT('medium'),
      is_comment: Sequelize.TINYINT(1),
      type: Sequelize.STRING(40),
    },
    {}
  );

  task_log.addHook('afterCreate', async (task_log, options) => {
    const ctx = await app.createAnonymousContext();
    const newProjectFile = Object.assign(
      {
        remark: '',
        icon: '',
        content: '',
        is_comment: 0,
      },
      task_log.dataValues
    );
    ctx.helper.sendSocketToClientOfRoom(newProjectFile, 'create:task_log');
  });
  task_log.addHook('afterUpdate', async (task_log, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_log, 'update:task_log');
  });
  task_log.addHook('afterDestroy', async (task_log, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_log, 'delete:task_log');
  });

  task_log.associate = function(models) {
    task_log.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'operator_id', as: 'operator' });
    task_log.hasOne(app.model.Tasks, { foreignKey: 'id', sourceKey: 'task_id', as: 'task' });
    // associations can be defined here
  };
  return task_log;
};
