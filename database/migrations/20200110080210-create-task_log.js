'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'task_logs',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        remark: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '日志说明',
        },
        task_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '任务ID',
          references: {
            model: 'tasks',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
        operator_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '操作人ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        icon: {
          type: Sequelize.STRING(60),
          allowNull: false,
          defaultValue: '',
          comment: '图标',
        },
        content: {
          type: Sequelize.TEXT('medium'),
          allowNull: true,
          comment: '日志内容',
        },
        is_comment: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否为评论.1为true,0为false',
        },
        type: {
          type: Sequelize.STRING(40),
          allowNull: false,
          defaultValue: '',
          comment: '类型',
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
    return queryInterface.dropTable('task_logs');
  },
};
