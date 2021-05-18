'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const user_task_like = app.model.define(
    'user_task_likes',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER(11),
      task_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
    },
    {}
  );
  user_task_like.associate = function(models) {
    // associations can be defined here
  };
  return user_task_like;
};
