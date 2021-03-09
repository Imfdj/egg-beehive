'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_project_collects',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        user_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '用户ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        project_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '项目ID',
          references: {
            model: 'projects',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
    return queryInterface.dropTable('user_project_collects');
  },
};
