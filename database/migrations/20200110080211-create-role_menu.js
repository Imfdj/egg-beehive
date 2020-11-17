'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED,
      },
      role_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        comment: '用户ID',
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      menu_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        comment: '菜单ID',
        references: {
          model: 'menus',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
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
    return queryInterface.dropTable('role_menus');
  },
};
