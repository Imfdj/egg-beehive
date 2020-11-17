'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const menu = app.model.define('menus', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING(60),
    path: Sequelize.STRING(100),
    parent_id: Sequelize.INTEGER(11),
    icon: Sequelize.STRING,
    title: Sequelize.STRING,
    hidden: Sequelize.TINYINT(1),
    always_show: Sequelize.TINYINT(1),
    keep_alive: Sequelize.TINYINT(1),
    target: Sequelize.STRING(20),
    component: Sequelize.STRING(100),
    redirect: Sequelize.STRING,
  }, {

  });
  menu.associate = function(models) {
    // associations can be defined here
  };
  return menu;
};
