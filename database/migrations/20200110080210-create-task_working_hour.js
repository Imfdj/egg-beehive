'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'task_working_hours',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        description: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '工作进展',
        },
        workTime: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '实际工时数',
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
        executor_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: '0',
          comment: '执行者ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        start_date: {
          type: Sequelize.DATE,
          comment: '开始时间',
        },
        end_date: {
          type: Sequelize.DATE,
          comment: '结束时间',
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
    return queryInterface.dropTable('task_working_hours');
  },
};
