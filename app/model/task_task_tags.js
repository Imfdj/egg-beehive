'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task_task_tag = app.model.define(
    'task_task_tags',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      task_id: Sequelize.INTEGER(11),
      task_tag_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
    },
    {}
  );

  task_task_tag.addHook('afterCreate', async (task_task_tag, options) => {
    const ctx = await app.createAnonymousContext();
    const task_tag = await app.model.TaskTags.findOne({ where: { id: task_task_tag.task_tag_id } });
    ctx.helper.sendSocketToClientOfRoom(task_tag, 'create:task_task_tag');
  });
  task_task_tag.addHook('afterDestroy', async (task_task_tag, options) => {
    const ctx = await app.createAnonymousContext();
    ctx.helper.sendSocketToClientOfRoom(task_task_tag, 'delete:task_task_tag');
  });

  task_task_tag.associate = function(models) {
    // associations can be defined here
    app.model.Tasks.belongsToMany(app.model.TaskTags, {
      through: app.model.TaskTaskTags,
      foreignKey: 'task_id',
      otherKey: 'task_tag_id',
    });
  };

  return task_task_tag;
};
