'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const operation_log = app.model.define(
    'operation_logs',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      operator_id: Sequelize.INTEGER(11),
      operator_username: Sequelize.STRING(60),
      status: Sequelize.STRING(15),
      ip: Sequelize.STRING(100),
      method: Sequelize.STRING(15),
      url: Sequelize.STRING(255),
      params: Sequelize.TEXT,
    },
    {}
  );
  operation_log.associate = function(models) {
    // associations can be defined here
  };
  return operation_log;
};
