'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task = app.model.define(
    'tasks',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.TEXT('tiny'),
      project_id: Sequelize.INTEGER(11),
      parent_id: Sequelize.INTEGER(11),
      task_list_id: Sequelize.INTEGER(11),
      task_state_id: Sequelize.INTEGER(11),
      task_type_id: Sequelize.INTEGER(11),
      task_priority_id: Sequelize.INTEGER(11),
      executor_id: Sequelize.INTEGER(11),
      start_date: Sequelize.STRING(30),
      end_date: Sequelize.STRING(30),
      remark: Sequelize.TEXT('medium'),
      is_privacy: Sequelize.TINYINT(1),
      is_recycle: Sequelize.TINYINT(1),
      likes: Sequelize.INTEGER(11),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  task.associate = function(models) {
    // associations can be defined here
    task.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'executor_id', as: 'executor' });
    app.model.Tasks.belongsToMany(app.model.Users, {
      through: app.model.UserTasks,
      foreignKey: 'task_id',
      otherKey: 'user_id',
      as: 'participators',
    });
  };
  return task;
};
