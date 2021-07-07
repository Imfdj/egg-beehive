'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'menus',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        name: {
          type: Sequelize.STRING(60),
          allowNull: false,
          comment: '路由名',
        },
        path: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '路由路径',
        },
        parent_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '父ID',
        },
        icon: {
          type: Sequelize.STRING,
          comment: '图标url',
        },
        title: {
          type: Sequelize.STRING,
          comment: '路由title',
        },
        hidden: {
          type: Sequelize.TINYINT(1).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '是否隐藏此路由.1为true,0为false',
        },
        always_show: {
          type: Sequelize.TINYINT(1).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '是否总是显示此路由.1为true,0为false',
        },
        keep_alive: {
          type: Sequelize.TINYINT(1).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '是否缓存此路由.1为true,0为false',
        },
        target: {
          type: Sequelize.STRING(20),
          comment: '打开新路由的方式',
        },
        component: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '路由对应的组件',
        },
        redirect: {
          type: Sequelize.STRING,
          comment: '路由重定向路径',
        },
        sort: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
          comment: '排序，越大越靠前',
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menus');
  },
};
