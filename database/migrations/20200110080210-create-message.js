'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'messages',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        actor_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '发起者ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        receiver_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '接受者ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: '内容',
        },
        is_read: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否为已读.1为true,0为false',
        },
        type: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: 'inform',
          comment: '类型',
        },
        url: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: '',
          comment: '跳转路径',
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
    return queryInterface.dropTable('messages');
  },
};
