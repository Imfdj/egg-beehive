'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'task_types',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: '',
          unique: true,
          comment: '类型名称',
        },
        color: {
          type: Sequelize.STRING(16),
          allowNull: false,
          defaultValue: '',
          unique: false,
          comment: '颜色',
        },
        icon: {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: '',
          comment: '图标',
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
    return queryInterface.dropTable('task_types');
  },
};
