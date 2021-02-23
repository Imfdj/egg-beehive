'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_log = app.model.define(
    'task_logs',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      remark: Sequelize.STRING(255),
      task_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
      operator_id: Sequelize.INTEGER(11),
      icon: Sequelize.STRING(60),
      content: Sequelize.TEXT('medium'),
      is_comment: Sequelize.TINYINT(1),
      type: Sequelize.STRING(40),
    },
    {

    }
  );
  task_log.associate = function(models) {
    task_log.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'operator_id', as: 'operator' });
    // associations can be defined here
  };
  return task_log;
};
