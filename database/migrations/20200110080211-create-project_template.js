'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'project_templates',
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
        cover: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '项目模板封面',
        },
        is_custom: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '1',
          comment: '是否为自定义模板.1为true,0为false',
        },
        intro: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '简介',
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
    return queryInterface.dropTable('project_templates');
  },
};
