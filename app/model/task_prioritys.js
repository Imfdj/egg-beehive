'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_priority = app.model.define(
    'task_prioritys',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(30),
      color: Sequelize.STRING(10),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  task_priority.associate = function(models) {
    // associations can be defined here
  };
  return task_priority;
};
