'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'project_template_tasks',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          unique: true,
          comment: '项目模板名称',
        },
        project_template_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '所属项目模板ID',
          references: {
            model: 'project_templates',
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
    return queryInterface.dropTable('project_template_tasks');
  },
};
