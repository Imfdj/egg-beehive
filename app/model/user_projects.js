'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const user_project = app.model.define(
    'user_projects',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
    },
    {}
  );
  user_project.associate = function(models) {
    // associations can be defined here
  };
  return user_project;
};
