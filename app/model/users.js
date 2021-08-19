'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const user = app.model.define(
    'users',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id_github: Sequelize.INTEGER,
      username: Sequelize.STRING(60),
      department_id: Sequelize.INTEGER,
      nickname: Sequelize.STRING(60),
      password: Sequelize.STRING(64),
      email: Sequelize.STRING(60),
      state: Sequelize.TINYINT,
      phone: Sequelize.STRING(15),
      avatar: Sequelize.STRING(255),
      company: Sequelize.STRING(80),
      city: Sequelize.STRING(80),
      last_login: Sequelize.DATE,
    },
    {
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );
  user.associate = function(models) {
    user.hasOne(app.model.Departments, { foreignKey: 'id', sourceKey: 'department_id', as: 'department' });
    app.model.Users.belongsToMany(app.model.Roles, {
      through: app.model.UserRoles,
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
    app.model.Users.belongsToMany(app.model.Projects, {
      through: app.model.UserProjects,
      foreignKey: 'user_id',
      otherKey: 'project_id',
    });
  };
  return user;
};
