'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'projects',
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
          comment: '项目名称',
        },
        parent_id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          defaultValue: 0,
          comment: '父ID',
        },
        manager_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '管理者ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
        },
        project_template_id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          comment: '创建时使用的模板ID',
        },
        progress: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
          comment: '项目进度0-100',
        },
        cover: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '项目封面',
        },
        is_private: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '1',
          comment: '是否为私有项目.1为true,0为false',
        },
        is_auto_progress: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否自动更新项目进度.1为true,0为false',
        },
        state: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '1',
          comment: '项目状态.1为正常、2为已归档、3为已在回收站',
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
    return queryInterface.dropTable('projects');
  },
};
