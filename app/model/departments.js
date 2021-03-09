'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const department = app.model.define(
    'departments',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(60),
      owner_id: Sequelize.INTEGER(11),
      parent_id: Sequelize.INTEGER(11),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  department.associate = function(models) {
    // associations can be defined here
  };
  return department;
};
