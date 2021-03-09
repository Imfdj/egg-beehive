'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_type = app.model.define(
    'task_types',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(50),
      color: Sequelize.STRING(16),
      icon: Sequelize.STRING(50),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  task_type.associate = function(models) {
    // associations can be defined here
  };
  return task_type;
};
