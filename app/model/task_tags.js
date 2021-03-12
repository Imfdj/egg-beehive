'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_tag = app.model.define(
    'task_tags',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(100),
      color: Sequelize.STRING(30),
      project_id: Sequelize.INTEGER(11),
    },
    {}
  );

  task_tag.addHook('afterCreate', async (task_tag, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_tag, 'create:task_tag');
  });
  task_tag.addHook('afterUpdate', async (task_tag, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_tag, 'update:task_tag');
  });
  task_tag.addHook('afterDestroy', async (task_tag, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_tag, 'delete:task_tag');
  });

  task_tag.associate = function(models) {
    task_tag.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'operator_id', as: 'operator' });
    // associations can be defined here
  };

  task_tag.associate = function(models) {
    // associations can be defined here
  };
  return task_tag;
};
