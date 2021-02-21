'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tasks',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        name: {
          type: Sequelize.TEXT('tiny'),
          allowNull: false,
          unique: false,
          comment: '任务名称',
        },
        parent_id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
          comment: '父ID',
        },
        task_list_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '所属任务列表ID',
          references: {
            model: 'task_lists',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        task_state_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '1',
          comment: '任务状态',
          references: {
            model: 'task_states',
            key: 'id',
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
        },
        task_type_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '1',
          comment: '任务类型ID',
          references: {
            model: 'task_types',
            key: 'id',
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
        },
        task_priority_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '1',
          comment: '任务优先级ID',
          references: {
            model: 'task_prioritys',
            key: 'id',
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
        },
        executor_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '执行者ID',
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: true,
          comment: '开始时间',
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true,
          comment: '结束时间',
        },
        remark: {
          type: Sequelize.TEXT('medium'),
          allowNull: true,
          unique: false,
          comment: '任务备注',
        },
        is_privacy: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否为隐私模式.1为true,0为false',
        },
        is_recycle: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否进入回收站.1为true,0为false',
        },
        likes: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '点赞数',
        },
        sort: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          unique: false,
          comment: '排序，越小越靠前',
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
    return queryInterface.dropTable('tasks');
  },
};
