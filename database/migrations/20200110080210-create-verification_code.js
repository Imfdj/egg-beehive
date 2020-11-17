'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verification_codes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED,
      },
      code: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: '',
        comment: '验证码',
      },
      target: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: '',
        comment: '验证码接受者',
      },
      type: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '类型.1为邮箱验证码,2为手机验证码',
      },
      available: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '是否可用.1为true,0为false',
      },
      expiration_time: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '过期时间',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('verification_codes');
  },
};
