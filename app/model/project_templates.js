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
    app.model.ProjectTemplates.hasMany(app.model.ProjectTemplateTasks, {
      foreignKey: 'project_template_id',
      targetKey: 'id',
    });
  };
  return project_template;
};
