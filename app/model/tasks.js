'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const task = app.model.define(
    'tasks',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.TEXT('tiny'),
      creator_id: Sequelize.INTEGER(11),
      project_id: Sequelize.INTEGER(11),
      parent_id: Sequelize.INTEGER(11),
      task_list_id: Sequelize.INTEGER(11),
      task_state_id: Sequelize.INTEGER(11),
      task_type_id: Sequelize.INTEGER(11),
      task_priority_id: Sequelize.INTEGER(11),
      executor_id: Sequelize.INTEGER(11),
      start_date: Sequelize.STRING(30),
      end_date: Sequelize.STRING(30),
      remark: Sequelize.TEXT('medium'),
      is_done: Sequelize.TINYINT(1),
      is_privacy: Sequelize.TINYINT(1),
      is_recycle: Sequelize.TINYINT(1),
      likes: Sequelize.INTEGER(11),
      plan_work_hours: Sequelize.INTEGER(11),
      sort: Sequelize.INTEGER(11),
    },
    {}
  );
  let setProgressTimer = null;
  /**
   * 设置项目进度
   * @param ctx
   * @param task
   */
  const setProgress = function(ctx, task) {
    if (setProgressTimer) {
      clearTimeout(setProgressTimer);
      setProgressTimer = null;
    }
    setProgressTimer = setTimeout(async () => {
      const project = await ctx.model.Projects.findOne({ where: { id: task.project_id } });
      if (project.is_auto_progress === 1) {
        const progress = await ctx.service.projects.getProjectProgress(ctx, task.project_id);
        ctx.model.Projects.update({ progress }, { where: { id: task.project_id }, individualHooks: true });
      }
    }, 500);
  };
  task.addHook('afterCreate', async (task, options) => {
    const ctx = await app.createAnonymousContext();
    // const newTask = await app.model.Tasks.findOne({
    //   where: { id: task.id },
    // });

    // 新建任务，根据情况设置项目进度值
    setProgress(ctx, task);
    const newTask = Object.assign(
      {
        parent_id: 0,
        executor_id: 0,
        start_date: '',
        end_date: '',
        remark: '',
        is_done: 0,
        is_privacy: 0,
        is_recycle: 0,
        likes: 0,
        plan_work_hours: 0,
      },
      task.dataValues
    );
    ctx.helper.sendSocketToClientOfRoom(newTask, 'create:task');
  });
  task.addHook('afterUpdate', async (task, options) => {
    const ctx = await app.createAnonymousContext();
    // 根据_changed，仅传输改动字段，及id，project_id
    // const data = app.lodash.pick(task.dataValues, [...Object.keys(task._changed), 'id', 'project_id']);

    // 如有is_done或is_recycle有修改，则需重新计算自动计算进度的项目的进度值
    if (!app.lodash.isUndefined(task._changed.is_done) || !app.lodash.isUndefined(task._changed.is_recycle)) {
      setProgress(ctx, task);
    }
    ctx.helper.sendSocketToClientOfRoom(task, 'update:task');
  });
  task.addHook('afterDestroy', async (task, options) => {
    const ctx = await app.createAnonymousContext();
    // 仅传输id
    // const data = app.lodash.pick(task.dataValues, ['id']);
    ctx.helper.sendSocketToClientOfRoom(task, 'delete:task');
  });
  task.associate = function(models) {
    // associations can be defined here
    task.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'executor_id', as: 'executor' });
    task.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'creator_id', as: 'creator' });
    task.hasOne(app.model.Projects, { foreignKey: 'id', sourceKey: 'project_id', as: 'project' });
    app.model.Tasks.belongsToMany(app.model.Users, {
      through: app.model.UserTasks,
      foreignKey: 'task_id',
      otherKey: 'user_id',
      as: 'participators',
    });
    app.model.Tasks.belongsToMany(app.model.Users, {
      through: app.model.UserTaskLikes,
      foreignKey: 'task_id',
      otherKey: 'user_id',
      as: 'likers',
    });
  };
  return task;
};
