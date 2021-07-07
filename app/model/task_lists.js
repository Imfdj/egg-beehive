'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_list = app.model.define(
    'task_lists',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(30),
      project_id: Sequelize.INTEGER(11),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );

  task_list.addHook('afterCreate', async (task_list, options) => {
    const ctx = await app.createAnonymousContext();
    const newProjectFile = Object.assign(
      {
        sort: 0,
      },
      task_list.dataValues
    );
    ctx.helper.sendSocketToClientOfRoom(newProjectFile, 'create:task_list');
  });
  task_list.addHook('afterUpdate', async (task_list, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_list, 'update:task_list');
  });
  task_list.addHook('afterDestroy', async (task_list, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_list, 'delete:task_list');
  });

  task_list.associate = function(models) {
    // associations can be defined here
    app.model.TaskLists.hasMany(app.model.Tasks, {
      foreignKey: 'task_list_id',
      targetKey: 'id',
    });
    app.model.TaskLists.hasOne(app.model.Projects, { foreignKey: 'id', sourceKey: 'project_id', as: 'project' });
  };

  return task_list;
};
