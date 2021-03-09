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
  task_list.associate = function(models) {
    // associations can be defined here
    app.model.TaskLists.hasMany(app.model.Tasks, {
      foreignKey: 'task_list_id',
      targetKey: 'id',
    });
  };
  return task_list;
};
