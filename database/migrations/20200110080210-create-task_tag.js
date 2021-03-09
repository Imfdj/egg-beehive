'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'task_tags',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: '',
          unique: true,
          comment: '标签名称',
        },
        color: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: '',
          unique: false,
          comment: '颜色',
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
    return queryInterface.dropTable('task_tags');
  },
};
