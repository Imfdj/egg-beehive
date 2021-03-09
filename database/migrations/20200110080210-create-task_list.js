'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'task_lists',
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
          unique: false,
          comment: '任务列表名称',
        },
        project_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '所属项目ID',
          references: {
            model: 'projects',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
    return queryInterface.dropTable('task_lists');
  },
};
