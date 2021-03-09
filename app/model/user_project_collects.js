'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const user_project_collect = app.model.define(
    'user_project_collects',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
    },
    {

    }
  );
  user_project_collect.associate = function(models) {
    // associations can be defined here
  };
  return user_project_collect;
};
