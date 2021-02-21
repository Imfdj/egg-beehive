'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_task_tag = app.model.define(
    'task_task_tags',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      task_id: Sequelize.INTEGER(11),
      task_tag_id: Sequelize.INTEGER(11),
    },
    {}
  );
  task_task_tag.associate = function(models) {
    // associations can be defined here
    app.model.Tasks.belongsToMany(app.model.TaskTags, {
      through: app.model.TaskTaskTags,
      foreignKey: 'task_id',
      otherKey: 'task_tag_id',
    });
  };

  return task_task_tag;
};
