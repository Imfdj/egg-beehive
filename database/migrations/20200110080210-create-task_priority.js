'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'task_prioritys',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: '',
          unique: true,
          comment: '优先级名称',
        },
        color: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: '',
          unique: false,
          comment: '颜色',
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
    return queryInterface.dropTable('task_prioritys');
  },
};
