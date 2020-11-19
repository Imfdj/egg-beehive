'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const configuration = app.model.define(
    'configurations',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      rsa_private_key: Sequelize.STRING(1000),
      rsa_public_key: Sequelize.STRING(1000),
    },
    {}
  );
  configuration.associate = function(models) {
    // associations can be defined here
  };
  return configuration;
};
