'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'configurations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
        },
        rsa_private_key: {
          type: Sequelize.STRING(1000),
          allowNull: false,
          defaultValue: '',
          comment: 'rsa私钥',
        },
        rsa_public_key: {
          type: Sequelize.STRING(1000),
          allowNull: false,
          defaultValue: '',
          comment: 'rsa公钥',
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
    return queryInterface.dropTable('configurations');
  },
};
