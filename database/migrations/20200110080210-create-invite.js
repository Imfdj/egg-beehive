'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'invites',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        uuid: {
          type: Sequelize.STRING(36),
          primaryKey: true,
          allowNull: false,
          unique: true,
          comment: '随机字符串ID',
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
          allowNull: true,
          comment: '接受者ID',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        is_accept: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: '0',
          comment: '是否已接受.1为true,0为false',
        },
        group: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: 'Projects',
          comment: '邀请加入群体的类型',
        },
        group_id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          comment: '邀请加入群体的ID',
        },
        expires: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: '到期时间',
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
    return queryInterface.dropTable('invites');
  },
};
