'use strict';
module.exports = app => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const role = app.model.define('roles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    is_default: TINYINT,
  }, {});
  role.associate = function(models) {
    // associations can be defined here
    app.model.Roles.belongsToMany(app.model.Permissions, {
      through: app.model.RolePermissions,
      foreignKey: 'role_id',
      otherKey: 'permission_id',
    });
    app.model.Roles.belongsToMany(app.model.Menus, {
      through: app.model.RoleMenus,
      foreignKey: 'role_id',
      otherKey: 'menu_id',
    });
  };
  return role;
};
