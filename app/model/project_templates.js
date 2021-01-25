'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const project_template = app.model.define(
    'project_templates',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(255),
      cover: Sequelize.STRING(255),
      is_custom: Sequelize.TINYINT(1),
      intro: Sequelize.STRING(255),
    },
    {}
  );
  project_template.associate = function(models) {
    // associations can be defined here
  };
  return project_template;
};
