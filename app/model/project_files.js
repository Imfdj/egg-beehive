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
      file_type: Sequelize.STRING(120),
      size: Sequelize.INTEGER(11),
      downloads: Sequelize.INTEGER(11),
      is_recycle: Sequelize.TINYINT(1),
    },
    {
      paranoid: true,
    }
  );

  project_file.addHook('afterCreate', async (project_file, options) => {
    const ctx = await app.createAnonymousContext();
    const newProjectFile = Object.assign(
      {
        task_id: null,
        filename: '',
        path: '',
        extension: '',
        file_type: '',
        size: 0,
        downloads: 0,
        is_recycle: 0,
      },
      project_file.dataValues
    );
    ctx.helper.sendSocketToClientOfRoom(newProjectFile, 'create:project_file');
  });
  project_file.addHook('afterUpdate', async (project_file, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(project_file, 'update:project_file');
  });
  project_file.addHook('afterDestroy', async (project_file, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(project_file, 'delete:project_file');
  });

  project_file.associate = function(models) {
    // associations can be defined here
  };
  return project_file;
};
