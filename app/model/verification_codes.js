'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const verification_code = app.model.define(
    'verification_codes',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      code: Sequelize.STRING(60),
      target: Sequelize.STRING(60),
      type: Sequelize.TINYINT(1),
      available: Sequelize.TINYINT(1),
      expiration_time: Sequelize.DATE,
    },
    {}
  );
  verification_code.associate = function(models) {
    // associations can be defined here
  };
  return verification_code;
};
