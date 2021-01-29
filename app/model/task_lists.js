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
  };
  return task_list;
};
