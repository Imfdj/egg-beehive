'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const role_menu = app.model.define(
    'role_menus',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      role_id: Sequelize.INTEGER(11),
      menu_id: Sequelize.INTEGER(11),
    },
    {}
  );
  role_menu.associate = function(models) {
    // associations can be defined here
  };
  return role_menu;
};
