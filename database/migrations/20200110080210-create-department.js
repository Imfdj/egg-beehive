'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('departments', {
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
        comment: '部门名称',
      },
      parent_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        comment: '父ID',
      },
      sort: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
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
    }, {
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('departments');
  },
};
