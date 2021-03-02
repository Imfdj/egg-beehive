'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'project_files',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '文件标题',
        },
        project_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '项目ID',
          references: {
            model: 'projects',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        task_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: true,
          defaultValue: '0',
          comment: '任务ID',
          references: {
            model: 'tasks',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        creator_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '创建人ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        filename: {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: '',
          comment: '文件名',
        },
        path: {
          type: Sequelize.STRING(225),
          allowNull: false,
          defaultValue: '',
          comment: '路径名',
        },
        extension: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: '',
          comment: '文件扩展名',
        },
        file_type: {
          type: Sequelize.STRING(60),
          allowNull: false,
          defaultValue: '',
          comment: '文件类型',
        },
        size: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '文件容量',
        },
        downloads: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '下载次数',
        },
        is_recycle: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否进入回收站.1为true,0为false',
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
    return queryInterface.dropTable('project_files');
  },
};
