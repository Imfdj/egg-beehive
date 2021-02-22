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
    {

    }
  );
  user_task.associate = function(models) {
    // associations can be defined here
  };
  return user_task;
};
