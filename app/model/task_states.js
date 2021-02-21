'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_state = app.model.define(
    'task_states',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(50),
      color: Sequelize.STRING(16),
      icon: Sequelize.STRING(50),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  task_state.associate = function(models) {
    // associations can be defined here
  };
  return task_state;
};
