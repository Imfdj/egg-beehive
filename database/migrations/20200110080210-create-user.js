'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        user_id_github: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: 'github用户ID',
        },
        username: {
          type: Sequelize.STRING(60),
          allowNull: false,
          unique: true,
          comment: '用户名',
        },
        nickname: {
          type: Sequelize.STRING(60),
          comment: '昵称',
          allowNull: false,
          defaultValue: '',
        },
        password: {
          type: Sequelize.STRING(64),
          allowNull: false,
          comment: '用户密码',
        },
        email: {
          type: Sequelize.STRING(60),
          unique: true,
          comment: '邮箱',
        },
        state: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: '0',
          comment: '状态：0.停用、1.正常',
        },
        phone: {
          type: Sequelize.STRING(15),
          comment: '手机号',
          allowNull: false,
          defaultValue: '',
        },
        avatar: {
          type: Sequelize.STRING(255),
          comment: '头像url',
          allowNull: false,
          defaultValue: '',
        },
        company: {
          type: Sequelize.STRING(80),
          comment: '国家',
          allowNull: false,
          defaultValue: '',
        },
        city: {
          type: Sequelize.STRING(80),
          comment: '城市',
          allowNull: false,
          defaultValue: '',
        },
        last_login: {
          type: Sequelize.DATE,
          comment: '最后登录时间',
        },
        deleted_at: {
          type: Sequelize.DATE,
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
    return queryInterface.dropTable('users');
  },
};
