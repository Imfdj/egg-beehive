'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const project_file = app.model.define(
    'project_files',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: Sequelize.STRING(100),
      project_id: Sequelize.INTEGER(11),
      task_id: Sequelize.INTEGER(11),
      creator_id: Sequelize.INTEGER(11),
      filename: Sequelize.STRING(50),
      path: Sequelize.STRING(225),
      extension: Sequelize.STRING(30),
      file_type: Sequelize.STRING(60),
      size: Sequelize.INTEGER(11),
      downloads: Sequelize.INTEGER(11),
      is_recycle: Sequelize.TINYINT(1),
    },
    {

    }
  );
  project_file.associate = function(models) {
    // associations can be defined here
  };
  return project_file;
};
