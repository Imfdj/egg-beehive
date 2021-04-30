'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'operation_logs',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        operator_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '发起者ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        status: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          comment: '请求返回状态',
        },
        ip: {
          type: Sequelize.STRING(100),
          allowNull: false,
          comment: '请求ip地址',
        },
        method: {
          type: Sequelize.STRING(15),
          allowNull: false,
          comment: '请求方法',
        },
        url: {
          type: Sequelize.STRING(255),
          allowNull: false,
          comment: '请求路径',
        },
        params: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: '请求参数',
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
    return queryInterface.dropTable('operation_logs');
  },
};
