'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;

  /**
   * webSocket
   */
  const socketIo = io.of('/socketIo');
  socketIo.route('server', io.controller.index.ping);
  socketIo.route('ack', io.controller.index.ack);

  /**
   * 健康检查
   */
  router.get('/healthy', controller.v1.users.healthy);
  /**
   * 用户
   */
  router.post('/api/v1/users', controller.v1.users.create);
  router.put('/api/v1/users', controller.v1.users.update);
  router.get('/api/v1/users/list', controller.v1.users.findAll);
  router.get('/api/v1/users', controller.v1.users.findOne);
  router.delete('/api/v1/users', controller.v1.users.destroy);
  router.post('/api/v1/users/login', controller.v1.users.login);
  router.post('/api/v1/users/logout', controller.v1.users.logout);
  router.get('/api/v1/users/user_info', controller.v1.users.userInfo);
  router.get('/api/v1/users/exists_user_unique_fields', controller.v1.users.existsUserUniqueFields);
  router.put('/api/v1/users/password', controller.v1.users.updateUserPassword);
  router.put('/api/v1/users/department', controller.v1.users.updateUserDepartment);
  router.post('/api/v1/users/refreshToken', controller.v1.users.refreshToken);
  router.put('/api/v1/users/department', controller.v1.users.minus);

  /**
   * 角色
   */
  router.post('/api/v1/roles', controller.v1.roles.create);
  router.put('/api/v1/roles', controller.v1.roles.update);
  router.get('/api/v1/roles/list', controller.v1.roles.index);
  router.get('/api/v1/roles', controller.v1.roles.show);
  router.delete('/api/v1/roles', controller.v1.roles.destroy);
  router.put('/api/v1/roles/is_default', controller.v1.roles.updateIsDefault);

  /**
   * 用户角色关系表
   */
  router.post('/api/v1/user_roles', controller.v1.userRoles.create); // 废弃
  router.put('/api/v1/user_roles', controller.v1.userRoles.update); // 废弃
  router.get('/api/v1/user_roles/list', controller.v1.userRoles.findAll);
  router.get('/api/v1/user_roles', controller.v1.userRoles.findOne); // 废弃
  router.delete('/api/v1/user_roles', controller.v1.userRoles.destroy);
  router.post('/api/v1/user_roles/bulk_role', controller.v1.userRoles.bulkCreateRole);

  /**
   * 资源
   */
  router.post('/api/v1/permissions', controller.v1.permissions.create);
  router.put('/api/v1/permissions', controller.v1.permissions.update);
  router.get('/api/v1/permissions/list', controller.v1.permissions.findAll);
  router.get('/api/v1/permissions', controller.v1.permissions.findOne);
  router.delete('/api/v1/permissions', controller.v1.permissions.destroy);

  /**
   * 角色-资源关系表
   */
  router.post('/api/v1/role_permissions', controller.v1.rolePermissions.create);
  router.put('/api/v1/role_permissions', controller.v1.rolePermissions.update);
  router.get('/api/v1/role_permissions/list', controller.v1.rolePermissions.findAll);
  router.get('/api/v1/role_permissions', controller.v1.rolePermissions.findOne);
  router.delete('/api/v1/role_permissions', controller.v1.rolePermissions.destroy);
  router.post('/api/v1/role_permissions/bulk_permission', controller.v1.rolePermissions.bulkCreatePremission);

  /**
   * 角色-菜单关系表
   */
  router.post('/api/v1/role_menus', controller.v1.roleMenus.create);
  router.put('/api/v1/role_menus', controller.v1.roleMenus.update);
  router.get('/api/v1/role_menus/list', controller.v1.roleMenus.findAll);
  router.get('/api/v1/role_menus', controller.v1.roleMenus.findOne);
  router.delete('/api/v1/role_menus', controller.v1.roleMenus.destroy);
  router.post('/api/v1/role_menus/bulk_menu', controller.v1.roleMenus.bulkCreateMenu);

  /**
   * 菜单
   */
  router.post('/api/v1/menus', controller.v1.menus.create);
  router.put('/api/v1/menus', controller.v1.menus.update);
  router.get('/api/v1/menus/list', controller.v1.menus.findAll);
  router.get('/api/v1/menus', controller.v1.menus.findOne);
  router.delete('/api/v1/menus', controller.v1.menus.destroy);
  router.get('/api/v1/menus/user_menus', controller.v1.menus.userMenus);

  /**
   * 验证码
   */
  router.post('/api/v1/verification_codes', controller.v1.verificationCodes.create);
  router.put('/api/v1/verification_codes', controller.v1.verificationCodes.update);
  router.get('/api/v1/verification_codes/list', controller.v1.verificationCodes.findAll);
  router.get('/api/v1/verification_codes', controller.v1.verificationCodes.findOne);
  router.delete('/api/v1/verification_codes', controller.v1.verificationCodes.destroy);
  router.get('/api/v1/verification_codes/verification', controller.v1.verificationCodes.verification);

  /**
   * 资源上传
   */
  router.post('/api/v1/uploads', controller.v1.uploads.create);

  /**
   * 配置
   */
  router.put('/api/v1/configurations', controller.v1.configurations.update);
  router.get('/api/v1/configurations/public_key', controller.v1.configurations.findRsaPublicKey);

  /**
   * 部门
   */
  router.post('/api/v1/departments', controller.v1.departments.create);
  router.put('/api/v1/departments', controller.v1.departments.update);
  router.get('/api/v1/departments/list', controller.v1.departments.findAll);
  router.get('/api/v1/departments', controller.v1.departments.findOne);
  router.delete('/api/v1/departments', controller.v1.departments.destroy);

  /**
   * 项目模板
   */
  router.post('/api/v1/project_templates', controller.v1.projectTemplates.create);
  router.put('/api/v1/project_templates', controller.v1.projectTemplates.update);
  router.get('/api/v1/project_templates/list', controller.v1.projectTemplates.findAll);
  router.get('/api/v1/project_templates', controller.v1.projectTemplates.findOne);
  router.delete('/api/v1/project_templates', controller.v1.projectTemplates.destroy);

  /**
   * 项目模板任务
   */
  router.post('/api/v1/project_template_tasks', controller.v1.projectTemplateTasks.create);
  router.put('/api/v1/project_template_tasks', controller.v1.projectTemplateTasks.update);
  router.get('/api/v1/project_template_tasks/list', controller.v1.projectTemplateTasks.findAll);
  router.get('/api/v1/project_template_tasks', controller.v1.projectTemplateTasks.findOne);
  router.delete('/api/v1/project_template_tasks', controller.v1.projectTemplateTasks.destroy);

  /**
   * 项目
   */
  router.post('/api/v1/projects', controller.v1.projects.create);
  router.put('/api/v1/projects', controller.v1.projects.update);
  router.get('/api/v1/projects/list', controller.v1.projects.findAll);
  router.get('/api/v1/projects', controller.v1.projects.findOne);
  router.delete('/api/v1/projects', controller.v1.projects.destroy);

  /**
   * 用户-项目关系
   */
  router.post('/api/v1/user_projects', controller.v1.userProjects.create);
  router.put('/api/v1/user_projects', controller.v1.userProjects.update);
  router.get('/api/v1/user_projects/list', controller.v1.userProjects.findAll);
  router.get('/api/v1/user_projects', controller.v1.userProjects.findOne);
  router.delete('/api/v1/user_projects', controller.v1.userProjects.destroy);

  /**
   * 任务列表
   */
  router.post('/api/v1/task_lists', controller.v1.taskLists.create);
  router.put('/api/v1/task_lists', controller.v1.taskLists.update);
  router.get('/api/v1/task_lists/list', controller.v1.taskLists.findAll);
  router.get('/api/v1/task_lists', controller.v1.taskLists.findOne);
  router.delete('/api/v1/task_lists', controller.v1.taskLists.destroy);

  /**
   * 任务优先级
   */
  router.post('/api/v1/task_prioritys', controller.v1.taskPrioritys.create);
  router.put('/api/v1/task_prioritys', controller.v1.taskPrioritys.update);
  router.get('/api/v1/task_prioritys/list', controller.v1.taskPrioritys.findAll);
  router.get('/api/v1/task_prioritys', controller.v1.taskPrioritys.findOne);
  router.delete('/api/v1/task_prioritys', controller.v1.taskPrioritys.destroy);

  /**
   * 任务状态
   */
  router.post('/api/v1/task_states', controller.v1.taskStates.create);
  router.put('/api/v1/task_states', controller.v1.taskStates.update);
  router.get('/api/v1/task_states/list', controller.v1.taskStates.findAll);
  router.get('/api/v1/task_states', controller.v1.taskStates.findOne);
  router.delete('/api/v1/task_states', controller.v1.taskStates.destroy);

  /**
   * 任务类型
   */
  router.post('/api/v1/task_types', controller.v1.taskTypes.create);
  router.put('/api/v1/task_types', controller.v1.taskTypes.update);
  router.get('/api/v1/task_types/list', controller.v1.taskTypes.findAll);
  router.get('/api/v1/task_types', controller.v1.taskTypes.findOne);
  router.delete('/api/v1/task_types', controller.v1.taskTypes.destroy);

  /**
   * 任务
   */
  router.post('/api/v1/tasks', controller.v1.tasks.create);
  router.put('/api/v1/tasks', controller.v1.tasks.update);
  router.get('/api/v1/tasks/list', controller.v1.tasks.findAll);
  router.get('/api/v1/tasks', controller.v1.tasks.findOne);
  router.delete('/api/v1/tasks', controller.v1.tasks.destroy);
  router.put('/api/v1/tasks/sort', controller.v1.tasks.sort);

  /**
   * 任务标签
   */
  router.post('/api/v1/task_tags', controller.v1.taskTags.create);
  router.put('/api/v1/task_tags', controller.v1.taskTags.update);
  router.get('/api/v1/task_tags/list', controller.v1.taskTags.findAll);
  router.get('/api/v1/task_tags', controller.v1.taskTags.findOne);
  router.delete('/api/v1/task_tags', controller.v1.taskTags.destroy);

  /**
   * 任务-任务标签关系表
   */
  router.post('/api/v1/task_task_tags', controller.v1.taskTaskTags.create);
  router.put('/api/v1/task_task_tags', controller.v1.taskTaskTags.update);
  router.get('/api/v1/task_task_tags/list', controller.v1.taskTaskTags.findAll);
  router.get('/api/v1/task_task_tags', controller.v1.taskTaskTags.findOne);
  router.delete('/api/v1/task_task_tags', controller.v1.taskTaskTags.destroy);
  router.post('/api/v1/task_task_tags/change', controller.v1.taskTaskTags.change);

  /**
   * 用户-任务标签关系表
   */
  // router.post('/api/v1/user_tasks', controller.v1.userTasks.create);
  // router.put('/api/v1/user_tasks', controller.v1.userTasks.update);
  // router.get('/api/v1/user_tasks/list', controller.v1.userTasks.findAll);
  // router.get('/api/v1/user_tasks', controller.v1.userTasks.findOne);
  // router.delete('/api/v1/user_tasks', controller.v1.userTasks.destroy);
  router.post('/api/v1/user_tasks/change', controller.v1.userTasks.change);

  /**
   * 任务日志
   */
  router.post('/api/v1/task_logs', controller.v1.taskLogs.create);
  router.put('/api/v1/task_logs', controller.v1.taskLogs.update);
  router.get('/api/v1/task_logs/list', controller.v1.taskLogs.findAll);
  // router.get('/api/v1/task_logs', controller.v1.taskLogs.findOne);
  router.delete('/api/v1/task_logs', controller.v1.taskLogs.destroy);

  /**
   * 任务工时
   */
  router.post('/api/v1/task_working_hours', controller.v1.taskWorkingHours.create);
  router.put('/api/v1/task_working_hours', controller.v1.taskWorkingHours.update);
  router.get('/api/v1/task_working_hours/list', controller.v1.taskWorkingHours.findAll);
  // router.get('/api/v1/task_working_hours', controller.v1.taskWorkingHours.findOne);
  router.delete('/api/v1/task_working_hours', controller.v1.taskWorkingHours.destroy);

  /**
   * 项目文件
   */
  router.post('/api/v1/project_files', controller.v1.projectFiles.create);
  router.put('/api/v1/project_files', controller.v1.projectFiles.update);
  router.get('/api/v1/project_files/list', controller.v1.projectFiles.findAll);
  router.get('/api/v1/project_files', controller.v1.projectFiles.findOne);
  router.delete('/api/v1/project_files', controller.v1.projectFiles.destroy);

  /**
   * 用户-项目-收藏关系表
   */
  router.post('/api/v1/user_project_collects/change', controller.v1.userProjectCollects.change);
};
