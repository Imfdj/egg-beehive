'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const project_template_task = app.model.define(
    'project_template_tasks',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(255),
      project_template_id: Sequelize.INTEGER(11),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  project_template_task.associate = function(models) {
    // associations can be defined here
  };
  return project_template_task;
};
