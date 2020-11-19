'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'permissions',
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
          defaultValue: '',
          comment: '资源名',
        },
        mark: {
          type: Sequelize.STRING(60),
          allowNull: false,
          defaultValue: '',
          comment: '标识码',
        },
        mark_name: {
          type: Sequelize.STRING(60),
          allowNull: false,
          defaultValue: '',
          comment: '标识码中文名',
        },
        url: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '路径',
        },
        action: {
          type: Sequelize.STRING(60),
          allowNull: false,
          defaultValue: '',
          comment: '动作',
        },
        description: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '描述',
        },
        state: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: 1,
          comment: '状态.1为true,0为false',
        },
        authentication: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: 1,
          comment: '是否需要认证.1为true,0为false',
        },
        authorization: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: 1,
          comment: '是否需要授权.1为true,0为false',
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
    return queryInterface.dropTable('permissions');
  },
};
