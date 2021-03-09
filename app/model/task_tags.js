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
  task_tag.associate = function(models) {
    // associations can be defined here
  };
  return task_tag;
};
