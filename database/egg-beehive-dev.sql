/*
 Navicat Premium Data Transfer

 Source Server         : MySQL_local
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:33066
 Source Schema         : egg-beehive-dev

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 13/09/2021 01:57:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for configurations
-- ----------------------------
DROP TABLE IF EXISTS `configurations`;
CREATE TABLE `configurations`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rsa_private_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'rsa私钥',
  `rsa_public_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'rsa公钥',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of configurations
-- ----------------------------
INSERT INTO `configurations` VALUES (1, '-----BEGIN RSA PRIVATE KEY-----\nMIIBOwIBAAJBAIXO+WV6AVKpcE5J/S0iJWuSkkMsYpgMA+H+MjFCizcCsMO/Sygw\nOhVgs/loEFJopWOdwJZ9GOZH+4kiM1vbtdUCAwEAAQJAYfGNRgUXIM2bwgKQik/b\nOjFwVDER/h+VW/+396ywwFNtZz1BxQ8Ouzfl3Br3oM0Uf3X1uYUheooASUniSpXc\n4QIhAMRyj8OjEaqGB63s5GxQrSnfqmdSG5daql6ZAgDtIODZAiEArl9FSVY05TiM\n9WYYN5iIy1TZAad/XpJDMPu0h2NV310CIAdftX3GdTdNaKRirABU1usndiICtv5r\nbNG4NJcMT5uhAiEAki4CKsnfTC6NVQiC0tDIFRWLWuytRX3+YCkTHdDz420CIQC0\nbVfEUtBx0B68es2PPoktxgMXAQpXVn8XF8MuIgcvag==\n-----END RSA PRIVATE KEY-----', '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIXO+WV6AVKpcE5J/S0iJWuSkkMsYpgM\nA+H+MjFCizcCsMO/SygwOhVgs/loEFJopWOdwJZ9GOZH+4kiM1vbtdUCAwEAAQ==\n-----END PUBLIC KEY-----', '2020-11-16 14:39:29', '2020-11-16 15:18:31');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `parent_id` int(11) UNSIGNED NOT NULL COMMENT '父ID',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序，越大越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `owner_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拥有者ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1000001 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES (20, '事业部', 0, 0, '2021-01-18 21:22:03', '2021-09-09 00:25:49', 0);
INSERT INTO `departments` VALUES (999999, '测试用', 0, 0, '2021-05-10 18:12:33', '2021-05-10 18:12:35', 0);

-- ----------------------------
-- Table structure for invites
-- ----------------------------
DROP TABLE IF EXISTS `invites`;
CREATE TABLE `invites`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '随机字符串ID',
  `actor_id` int(11) UNSIGNED NOT NULL COMMENT '发起者ID',
  `receiver_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '接受者ID',
  `is_accept` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否已接受.1为true,0为false',
  `group` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Projects' COMMENT '邀请加入群体的类型',
  `group_id` int(11) UNSIGNED NOT NULL COMMENT '邀请加入群体的ID',
  `expires` datetime(0) NOT NULL COMMENT '到期时间',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`, `uuid`) USING BTREE,
  UNIQUE INDEX `uuid`(`uuid`) USING BTREE,
  INDEX `actor_id`(`actor_id`) USING BTREE,
  INDEX `receiver_id`(`receiver_id`) USING BTREE,
  CONSTRAINT `invites_ibfk_1` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invites_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 111 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invites
-- ----------------------------
INSERT INTO `invites` VALUES (110, 'e7660a3f-4c2f-47a6-9d8d-262d06253f03', 1, 2, 1, 'Projects', 1000064, '2021-09-20 01:38:25', '2021-09-13 01:38:25', '2021-09-13 01:38:34');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '路由名',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路由路径',
  `parent_id` int(11) UNSIGNED NOT NULL COMMENT '父ID',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标url',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由title',
  `hidden` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否隐藏此路由.1为true,0为false',
  `always_show` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否总是显示此路由.1为true,0为false',
  `keep_alive` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否缓存此路由.1为true,0为false',
  `target` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '打开新路由的方式',
  `component` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路由对应的组件',
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由重定向路径',
  `sort` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 'layout', '/', 0, 'el-icon-monitor', '工作台', 0, 0, 0, '', 'Layout', '/index', 999999, '2020-07-13 17:46:24', '2021-05-12 12:03:24');
INSERT INTO `menus` VALUES (2, 'PersonnelManagement', '/personnelManagement', 0, 'el-icon-setting', '管理员配置', 0, 0, 0, '', 'Layout', '/personnelManagement/UserManagement', 666666, '2020-07-14 14:56:50', '2021-05-12 13:59:58');
INSERT INTO `menus` VALUES (8, 'UserManagement', 'UserManagement', 2, 'iconfont icon-ren', '用户管理', 0, 0, 0, NULL, 'views/personnelManagement/userManagement/index', NULL, 1000, '2020-07-24 21:05:21', '2021-05-12 14:04:29');
INSERT INTO `menus` VALUES (9, 'RoleManagement', 'roleManagement', 2, 'iconfont icon-role', '角色管理', 0, 0, 0, NULL, 'views/personnelManagement/roleManagement/index', NULL, 990, '2020-07-24 21:07:21', '2021-05-12 14:04:44');
INSERT INTO `menus` VALUES (10, 'MenuManagement', 'menuManagement', 2, 'iconfont icon-caidan1', '菜单管理', 0, 0, 0, NULL, 'views/personnelManagement/menuManagement/index', NULL, 980, '2020-07-24 21:07:41', '2021-05-12 14:04:50');
INSERT INTO `menus` VALUES (15, 'Index', 'index', 1, 'home', '首页', 1, 0, 0, NULL, 'views/index/index', NULL, 0, '2020-07-27 19:34:26', '2021-04-07 11:04:46');
INSERT INTO `menus` VALUES (18, 'PermissionManagement', 'permissionManagement', 2, 'iconfont icon-jiekou', '资源管理', 0, 0, 0, NULL, 'views/personnelManagement/permissionManagement/index', NULL, 970, '2020-07-31 00:46:33', '2021-05-12 14:04:56');
INSERT INTO `menus` VALUES (22, 'personalCenter', '/personalCenter', 0, NULL, NULL, 1, 0, 0, NULL, 'Layout', 'personalCenter', 0, '2020-08-04 21:41:39', '2020-08-04 21:41:39');
INSERT INTO `menus` VALUES (23, 'PersonalCenter', 'personalCenter', 22, NULL, '个人中心', 1, 0, 0, NULL, 'views/personalCenter/index', NULL, 0, '2020-08-04 21:42:02', '2020-08-04 21:43:10');
INSERT INTO `menus` VALUES (25, 'departmentManagement', '/departmentManagement', 0, 'iconfont icon-duoren', '部门管理', 0, 0, 0, NULL, 'Layout', '/departmentManagement/departmentManagement', 777777, '2020-11-26 15:18:08', '2021-05-12 13:59:49');
INSERT INTO `menus` VALUES (26, 'DepartmentManagement', 'departmentManagement', 25, '', '部门管理', 1, 0, 0, NULL, 'views/departmentManagement/index', NULL, 0, '2020-11-26 15:31:37', '2021-04-08 21:06:54');
INSERT INTO `menus` VALUES (27, 'ProjectManagement', '/projectManagement', 0, 'el-icon-s-data', '项目管理', 0, 0, 0, NULL, 'Layout', '/projectManagement/ProjectLists', 888888, '2021-01-21 20:08:19', '2021-05-12 20:09:39');
INSERT INTO `menus` VALUES (28, 'ProjectList_1', 'ProjectList/1', 32, 'el-icon-tickets', '全部项目', 0, 0, 0, NULL, 'views/projectManagement/projectList/index', '', 400, '2021-01-21 20:11:33', '2021-07-23 20:19:26');
INSERT INTO `menus` VALUES (29, 'ProjectList_2', 'ProjectList/2', 32, 'el-icon-star-off', '我的收藏', 0, 0, 0, NULL, 'views/projectManagement/projectList/index', '', 300, '2021-01-21 20:15:51', '2021-07-23 20:19:31');
INSERT INTO `menus` VALUES (30, 'ProjectList_3', 'ProjectList/3', 32, 'el-icon-s-cooperation', '已归档项目', 0, 0, 0, NULL, 'views/projectManagement/projectList/index', NULL, 200, '2021-01-21 20:26:52', '2021-07-23 20:19:35');
INSERT INTO `menus` VALUES (31, 'ProjectList_4', 'ProjectList/4', 32, 'el-icon-delete', '回收站', 0, 0, 0, NULL, 'views/projectManagement/projectList/index', NULL, 100, '2021-01-21 20:27:20', '2021-07-23 20:19:39');
INSERT INTO `menus` VALUES (32, 'ProjectLists', 'ProjectLists', 27, 'iconfont icon-caidan1', '项目列表', 0, 0, 0, NULL, 'EmptyLayout', '/projectManagement/ProjectLists/ProjectList/1', 300, '2021-01-22 18:17:34', '2021-07-07 17:19:12');
INSERT INTO `menus` VALUES (33, 'ProjectTemplate', 'ProjectTemplate', 27, 'el-icon-notebook-1', '项目模板', 0, 0, 0, NULL, 'views/projectManagement/projectTemplate/index', NULL, 200, '2021-01-22 18:23:12', '2021-07-07 17:19:21');
INSERT INTO `menus` VALUES (34, 'Project', 'Project/:id', 27, NULL, '项目', 1, 1, 0, NULL, 'views/projectManagement/project/index', NULL, 1, '2021-02-01 20:25:36', '2021-03-16 18:07:50');
INSERT INTO `menus` VALUES (35, 'invite', '/invite', 0, NULL, '邀请', 1, 0, 0, NULL, 'EmptyLayout', NULL, 0, '2021-04-21 17:30:35', '2021-04-21 17:34:20');
INSERT INTO `menus` VALUES (36, 'project', 'project/:id', 35, NULL, '项目邀请', 1, 0, 0, NULL, 'views/invite/ProjectInvite', NULL, 0, '2021-04-21 17:31:28', '2021-04-21 20:17:21');
INSERT INTO `menus` VALUES (37, 'OperationLogManagement', 'operationLogManagement', 2, 'el-icon-time', '操作日志', 0, 0, 0, NULL, 'views/personnelManagement/operationLogManagement/index', NULL, 960, '2021-05-06 11:48:56', '2021-05-12 14:05:04');
INSERT INTO `menus` VALUES (38, 'Message', 'message', 27, 'iconfont icon-lingdang-xianxing', '消息提醒', 0, 0, 0, NULL, 'EmptyLayout', NULL, 100, '2021-07-07 17:19:58', '2021-07-07 17:19:58');
INSERT INTO `menus` VALUES (39, 'mention', 'mention', 38, 'iconfont icon-xiaoxi', '@我', 0, 0, 0, NULL, 'views/projectManagement/messageManagement/index', NULL, 300, '2021-07-07 17:20:21', '2021-07-07 17:20:21');
INSERT INTO `menus` VALUES (40, 'inform', 'inform', 38, 'iconfont icon-tongzhi', '通知', 0, 0, 0, NULL, 'views/projectManagement/messageManagement/index', NULL, 200, '2021-07-07 17:20:41', '2021-07-07 17:20:41');
INSERT INTO `menus` VALUES (41, 'personal', 'personal', 38, 'iconfont icon-icon--', '私信', 0, 0, 0, NULL, 'views/projectManagement/messageManagement/index', NULL, 100, '2021-07-07 17:21:00', '2021-07-07 17:21:00');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `actor_id` int(11) UNSIGNED NOT NULL COMMENT '发起者ID',
  `receiver_id` int(11) UNSIGNED NOT NULL COMMENT '接受者ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  `is_read` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为已读.1为true,0为false',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'inform' COMMENT '类型',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '跳转路径',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `actor_id`(`actor_id`) USING BTREE,
  INDEX `receiver_id`(`receiver_id`) USING BTREE,
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 815 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES (810, 1, 2, '邀请你加入项目 <span class=\"project-name\">Beehive 新手引导</span>', 1, 'personal', '/invite/project/e7660a3f-4c2f-47a6-9d8d-262d06253f03', '2021-09-13 01:38:25', '2021-09-13 01:38:27');
INSERT INTO `messages` VALUES (811, 2, 1, '已接受你的邀请，加入了项目 <span class=\"project-name\">Beehive 新手引导</span>', 0, 'personal', '/projectManagement/Project/1000064', '2021-09-13 01:38:34', '2021-09-13 01:38:34');
INSERT INTO `messages` VALUES (812, 1, 2, '指派给你一个任务 <span class=\"task-name\">什么是任务「执行者」？</span>', 0, 'inform', '/projectManagement/Project/1000064?taskId=1000104', '2021-09-13 01:38:48', '2021-09-13 01:38:48');
INSERT INTO `messages` VALUES (813, 1, 2, '指派给你一个任务 <span class=\"task-name\">① 创建一个「项目」</span>', 0, 'inform', '/projectManagement/Project/1000064?taskId=1000115', '2021-09-13 01:46:45', '2021-09-13 01:46:45');
INSERT INTO `messages` VALUES (814, 1, 2, '指派给你一个任务 <span class=\"task-name\">在任务面板中，可添加评论。</span>', 0, 'inform', '/projectManagement/Project/1000064?taskId=1000118', '2021-09-13 01:48:40', '2021-09-13 01:48:40');

-- ----------------------------
-- Table structure for operation_logs
-- ----------------------------
DROP TABLE IF EXISTS `operation_logs`;
CREATE TABLE `operation_logs`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `operator_id` int(11) UNSIGNED NOT NULL COMMENT '发起者ID',
  `operator_username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发起者用户名',
  `status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求返回状态',
  `ip` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求ip地址',
  `method` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求方法',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求路径',
  `params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求参数',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `operator_id`(`operator_id`) USING BTREE,
  INDEX `operator_username`(`operator_username`) USING BTREE,
  CONSTRAINT `operation_logs_ibfk_1` FOREIGN KEY (`operator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `operation_logs_ibfk_2` FOREIGN KEY (`operator_username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1350 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operation_logs
-- ----------------------------
INSERT INTO `operation_logs` VALUES (1349, 1, 'admin', '201', '127.0.0.1', 'PUT', '/api/v1/projects', '{\"id\":1000064,\"name\":\"Beehive 新手引导\",\"parent_id\":0,\"manager_id\":1,\"project_template_id\":18,\"progress\":6,\"cover\":\"https://i.picsum.photos/id/399/290/160.jpg?hmac=3xULt6wNyF5o6cyMNb9Whr8XKjwrGAGKErAeJyDjKVQ\",\"is_recycle\":0,\"is_archived\":0,\"is_private\":0,\"is_auto_progress\":1,\"state\":1,\"intro\":\"新手引导项目\",\"created_at\":\"2021-09-13 01:37:50\",\"updated_at\":\"2021-09-13 01:51:35\",\"creator\":{\"username\":\"admin\",\"id\":1,\"avatar\":\"https://qiniucdn.imfdj.top/avatar.jpg\"},\"collector\":[],\"member\":[{\"id\":1,\"user_id_github\":0,\"username\":\"admin\",\"department_id\":20,\"nickname\":\"管理员\",\"email\":\"11@qq.com\",\"state\":1,\"phone\":\"18686868686\",\"avatar\":\"https://qiniucdn.imfdj.top/avatar.jpg\",\"company\":\"\",\"city\":\"\",\"last_login\":\"2021-09-13 01:34:35\",\"created_at\":\"2020-07-13 10:23:03\",\"updated_at\":\"2021-09-13 01:34:35\",\"deleted_at\":null,\"user_projects\":{\"id\":109,\"user_id\":1,\"project_id\":1000064,\"created_at\":\"2021-09-13 01:37:50\",\"updated_at\":\"2021-09-13 01:37:50\"}},{\"id\":2,\"user_id_github\":0,\"username\":\"root\",\"department_id\":20,\"nickname\":\"\",\"email\":\"9077@qq.com\",\"state\":1,\"phone\":\" \",\"avatar\":\"https://qiniucdn.imfdj.top/avatar.jpg\",\"company\":\"\",\"city\":\"\",\"last_login\":\"2021-09-13 01:26:30\",\"created_at\":\"2020-07-21 15:54:59\",\"updated_at\":\"2021-09-13 01:26:30\",\"deleted_at\":null,\"user_projects\":{\"id\":110,\"user_id\":2,\"project_id\":1000064,\"created_at\":\"2021-09-13 01:38:34\",\"updated_at\":\"2021-09-13 01:38:34\"}}]}', '2021-09-13 01:53:23', '2021-09-13 01:53:23');

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '资源名',
  `mark` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标识码',
  `mark_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标识码中文名',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路径',
  `action` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '动作',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '描述',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态.1为true,0为false',
  `authentication` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否需要认证.1为true,0为false',
  `authorization` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否需要授权.1为true,0为false',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 190 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (1, '注册', 'users', '用户', '/api/v1/users', 'post', '', 1, 0, 0, '2020-07-31 00:46:57', '2021-05-07 16:03:31');
INSERT INTO `permissions` VALUES (2, '登录', 'users', '用户', '/api/v1/users/login', 'post', '', 1, 0, 0, '2020-07-31 01:10:33', '2020-08-03 21:02:39');
INSERT INTO `permissions` VALUES (3, '登出', 'users', '用户', '/api/v1/users/logout', 'post', '', 1, 0, 0, '2020-07-31 01:11:33', '2020-08-03 21:02:36');
INSERT INTO `permissions` VALUES (4, '用户信息', 'users', '用户', '/api/v1/users/user_info', 'get', '', 1, 1, 0, '2020-07-31 01:12:11', '2020-08-06 21:36:08');
INSERT INTO `permissions` VALUES (5, '新增', 'roles', '角色', '/api/v1/roles', 'post', '', 1, 1, 1, '2020-07-31 01:13:43', '2020-08-03 21:03:13');
INSERT INTO `permissions` VALUES (9, '列表', 'roles', '角色', '/api/v1/roles/list', 'get', '', 1, 1, 1, '2020-07-31 20:35:32', '2020-09-14 19:58:30');
INSERT INTO `permissions` VALUES (10, '修改', 'roles', '角色', '/api/v1/roles', 'put', '', 1, 1, 1, '2020-07-31 20:35:46', '2020-11-25 18:19:54');
INSERT INTO `permissions` VALUES (11, '批量删除', 'roles', '角色', '/api/v1/roles', 'delete', '', 1, 1, 1, '2020-07-31 20:35:51', '2020-08-03 21:03:21');
INSERT INTO `permissions` VALUES (12, '详情', 'roles', '角色', '/api/v1/roles', 'get', '', 1, 1, 1, '2020-07-31 20:44:50', '2020-08-03 21:03:24');
INSERT INTO `permissions` VALUES (13, '新增', 'user_roles', '用户角色关系表', '/api/v1/user_roles', 'post', '', 1, 1, 1, '2020-07-31 20:45:24', '2020-09-10 14:01:50');
INSERT INTO `permissions` VALUES (14, '详情', 'user_roles', '用户角色关系表', '/api/v1/user_roles', 'get', '', 1, 1, 1, '2020-07-31 20:45:28', '2020-08-03 20:57:15');
INSERT INTO `permissions` VALUES (15, '修改', 'user_roles', '用户角色关系表', '/api/v1/user_roles', 'put', '', 1, 1, 1, '2020-07-31 20:45:30', '2020-08-03 20:57:12');
INSERT INTO `permissions` VALUES (16, '批量删除', 'user_roles', '用户角色关系表', '/api/v1/user_roles', 'delete', '', 1, 1, 1, '2020-07-31 20:45:32', '2020-08-03 20:57:09');
INSERT INTO `permissions` VALUES (17, '列表', 'user_roles', '用户角色关系表', '/api/v1/user_roles/list', 'get', '', 1, 1, 1, '2020-07-31 20:45:53', '2020-08-03 20:56:46');
INSERT INTO `permissions` VALUES (18, '新增单用户-多角色关系', 'user_roles', '用户角色关系表', '/api/v1/user_roles/bulk_role', 'post', '', 1, 1, 1, '2020-07-31 20:48:12', '2020-08-03 21:02:23');
INSERT INTO `permissions` VALUES (19, '列表', 'permissions', '资源', '/api/v1/permissions/list', 'get', '', 1, 1, 0, '2020-08-03 15:35:16', '2020-08-03 21:03:29');
INSERT INTO `permissions` VALUES (20, '用户菜单', 'menus', '菜单', '/api/v1/menus/user_menus', 'get', '', 1, 1, 0, '2020-08-03 15:56:44', '2020-08-03 21:03:41');
INSERT INTO `permissions` VALUES (21, '新增', 'permissions', '资源', '/api/v1/permissions', 'post', '', 1, 1, 0, '2020-08-03 18:50:27', '2020-08-03 21:13:43');
INSERT INTO `permissions` VALUES (22, '列表', 'role_permissions', '角色资源关系表', '/api/v1/role_permissions/list', 'get', '', 1, 1, 0, '2020-08-03 18:57:58', '2020-08-03 21:04:11');
INSERT INTO `permissions` VALUES (23, '列表', 'users', '用户', '/api/v1/users/list', 'get', '', 1, 1, 1, '2020-08-03 19:02:53', '2020-08-03 21:02:47');
INSERT INTO `permissions` VALUES (25, '角色批量添加资源', 'role_permissions', '角色资源关系表', '/api/v1/role_permissions/bulk_permission', 'post', '', 1, 1, 0, '2020-08-03 19:07:18', '2020-08-03 21:04:14');
INSERT INTO `permissions` VALUES (26, '批量删除', 'role_permissions', '角色资源关系表', '/api/v1/role_permissions', 'delete', '', 1, 1, 1, '2020-08-03 19:08:30', '2020-08-03 21:04:17');
INSERT INTO `permissions` VALUES (27, '修改', 'permissions', '资源', '/api/v1/permissions', 'put', '', 1, 1, 1, '2020-08-03 20:31:19', '2020-08-03 21:03:34');
INSERT INTO `permissions` VALUES (28, '修改', 'users', '用户', '/api/v1/users', 'put', '', 1, 1, 1, '2020-08-03 21:07:52', '2020-08-14 21:19:42');
INSERT INTO `permissions` VALUES (29, '批量删除', 'users', '用户', '/api/v1/users', 'delete', '', 0, 1, 1, '2020-08-03 21:08:31', '2020-08-03 21:08:31');
INSERT INTO `permissions` VALUES (30, '详情', 'users', '用户', '/api/v1/users', 'get', '', 1, 1, 1, '2020-08-03 21:09:07', '2020-09-27 17:38:37');
INSERT INTO `permissions` VALUES (31, '详情', 'permissions', '资源', '/api/v1/permissions', 'get', '', 1, 1, 1, '2020-08-03 21:11:30', '2020-08-03 21:13:37');
INSERT INTO `permissions` VALUES (32, '批量删除', 'permissions', '资源', '/api/v1/permissions', 'delete', '', 1, 1, 1, '2020-08-03 21:11:34', '2020-08-03 21:13:31');
INSERT INTO `permissions` VALUES (34, '新增', 'role_permissions', '角色资源关系表', '/api/v1/role_permissions', 'post', '', 1, 1, 1, '2020-08-03 21:15:13', '2020-08-03 21:15:13');
INSERT INTO `permissions` VALUES (35, '详情', 'role_permissions', '角色资源关系表', '/api/v1/role_permissions', 'get', '', 1, 1, 1, '2020-08-03 21:15:16', '2020-08-03 21:15:16');
INSERT INTO `permissions` VALUES (36, '修改', 'role_permissions', '角色资源关系表', '/api/v1/role_permissions', 'put', '', 1, 1, 1, '2020-08-03 21:15:18', '2020-08-03 21:15:18');
INSERT INTO `permissions` VALUES (37, '新增', 'menus', '菜单', '/api/v1/menus', 'post', '', 1, 1, 1, '2020-08-03 21:17:20', '2020-08-03 21:17:20');
INSERT INTO `permissions` VALUES (38, '详情', 'menus', '菜单', '/api/v1/menus', 'get', '', 1, 1, 1, '2020-08-03 21:17:24', '2020-08-03 21:17:24');
INSERT INTO `permissions` VALUES (39, '修改', 'menus', '菜单', '/api/v1/menus', 'put', '', 1, 1, 1, '2020-08-03 21:17:26', '2020-08-03 21:17:26');
INSERT INTO `permissions` VALUES (40, '批量删除', 'menus', '菜单', '/api/v1/menus', 'delete', '', 1, 1, 1, '2020-08-03 21:17:28', '2020-08-03 21:17:28');
INSERT INTO `permissions` VALUES (41, '列表', 'menus', '菜单', '/api/v1/menus/list', 'get', '', 1, 1, 1, '2020-08-03 21:17:33', '2020-11-16 16:01:18');
INSERT INTO `permissions` VALUES (42, '新增', 'role_menus', '角色菜单关系表', '/api/v1/role_menus', 'post', '', 1, 1, 1, '2020-08-03 21:18:16', '2020-08-03 21:18:16');
INSERT INTO `permissions` VALUES (43, '详情', 'role_menus', '角色菜单关系表', '/api/v1/role_menus', 'get', '', 1, 1, 1, '2020-08-03 21:18:18', '2020-08-03 21:18:18');
INSERT INTO `permissions` VALUES (44, '修改', 'role_menus', '角色菜单关系表', '/api/v1/role_menus', 'put', '', 1, 1, 1, '2020-08-03 21:18:20', '2020-08-03 21:18:20');
INSERT INTO `permissions` VALUES (45, '批量删除', 'role_menus', '角色菜单关系表', '/api/v1/role_menus', 'delete', '', 1, 1, 1, '2020-08-03 21:18:22', '2020-08-03 21:18:22');
INSERT INTO `permissions` VALUES (46, '列表', 'role_menus', '角色菜单关系表', '/api/v1/role_menus/list', 'get', '', 1, 1, 1, '2020-08-03 21:18:27', '2020-08-03 21:18:27');
INSERT INTO `permissions` VALUES (47, '单角色批量添加多菜单', 'role_menus', '角色菜单关系表', '/api/v1/role_menus/bulk_menu', 'post', '', 1, 1, 1, '2020-08-03 21:19:53', '2020-08-03 21:19:53');
INSERT INTO `permissions` VALUES (48, '是否存在此用户字段', 'users', '用户', '/api/v1/users/exists_user_unique_fields', 'get', '', 1, 0, 0, '2020-08-05 19:59:49', '2020-08-05 20:14:37');
INSERT INTO `permissions` VALUES (49, '新增', 'verification_codes', '验证码', '/api/v1/verification_codes', 'post', '', 1, 0, 0, '2020-08-05 21:13:56', '2020-08-05 21:18:53');
INSERT INTO `permissions` VALUES (50, '详情', 'verification_codes', '验证码', '/api/v1/verification_codes', 'get', '', 1, 1, 1, '2020-08-05 21:13:58', '2020-08-05 21:18:57');
INSERT INTO `permissions` VALUES (51, '修改', 'verification_codes', '验证码', '/api/v1/verification_codes', 'put', '', 1, 0, 0, '2020-08-05 21:14:00', '2020-08-05 21:19:01');
INSERT INTO `permissions` VALUES (52, '批量删除', 'verification_codes', '验证码', '/api/v1/verification_codes', 'delete', '', 1, 1, 1, '2020-08-05 21:14:02', '2020-08-05 21:19:05');
INSERT INTO `permissions` VALUES (53, '列表', 'verification_codes', '验证码', '/api/v1/verification_codes/list', 'get', '', 1, 0, 0, '2020-08-05 21:14:08', '2020-08-05 21:19:10');
INSERT INTO `permissions` VALUES (54, '验证此验证码', 'verification_codes', '验证码', '/api/v1/verification_codes/verification', 'get', '', 1, 0, 0, '2020-08-05 21:38:17', '2020-08-05 21:38:17');
INSERT INTO `permissions` VALUES (55, '上传', 'uploads', '上传资源', '/api/v1/uploads', 'post', '', 1, 1, 0, '2020-08-13 19:40:04', '2021-07-27 18:49:01');
INSERT INTO `permissions` VALUES (56, '修改密码', 'users', '用户', '/api/v1/users/password', 'put', '', 1, 0, 0, '2020-08-20 20:44:09', '2020-08-20 20:44:09');
INSERT INTO `permissions` VALUES (79, '更新是否为默认角色', 'roles', '角色', '/api/v1/roles/is_default', 'put', '', 1, 1, 1, '2020-09-18 11:01:39', '2020-09-18 11:01:39');
INSERT INTO `permissions` VALUES (80, '修改', 'configurations', '配置', '/api/v1/configurations', 'put', '', 1, 1, 1, '2020-11-16 14:29:37', '2020-11-16 14:29:37');
INSERT INTO `permissions` VALUES (82, '公钥', 'configurations', '配置', '/api/v1/configurations/public_key', 'get', '', 1, 0, 0, '2020-11-16 14:30:53', '2020-11-16 14:46:10');
INSERT INTO `permissions` VALUES (83, '列表', 'departments', '部门', '/api/v1/departments/list', 'get', '', 1, 1, 1, '2020-11-17 14:51:06', '2020-11-17 14:51:24');
INSERT INTO `permissions` VALUES (84, '新增', 'departments', '部门', '/api/v1/departments', 'post', '', 1, 1, 1, '2020-11-17 14:51:42', '2020-11-17 14:51:42');
INSERT INTO `permissions` VALUES (85, '详情', 'departments', '部门', '/api/v1/departments', 'get', '', 1, 1, 1, '2020-11-17 14:51:46', '2020-11-17 14:51:46');
INSERT INTO `permissions` VALUES (86, '修改', 'departments', '部门', '/api/v1/departments', 'put', '', 1, 1, 1, '2020-11-17 14:51:49', '2020-11-17 14:51:49');
INSERT INTO `permissions` VALUES (87, '批量删除', 'departments', '部门', '/api/v1/departments', 'delete', '', 1, 1, 1, '2020-11-17 14:51:52', '2020-11-17 14:51:52');
INSERT INTO `permissions` VALUES (88, '修改用户所属部门', 'users', '用户', '/api/v1/users/department', 'put', '', 1, 1, 1, '2020-11-17 15:55:25', '2020-11-17 15:55:25');
INSERT INTO `permissions` VALUES (90, '列表', 'interface_operation_logs', '接口操作日志', '/api/v1/interface_operation_logs/list', 'get', '', 1, 1, 1, '2021-01-18 18:05:27', '2021-01-18 18:05:27');
INSERT INTO `permissions` VALUES (91, '新增', 'project_templates', '项目模板', '/api/v1/project_templates', 'post', '', 1, 1, 1, '2021-01-21 17:57:08', '2021-01-21 17:57:08');
INSERT INTO `permissions` VALUES (92, '详情', 'project_templates', '项目模板', '/api/v1/project_templates', 'get', '', 1, 1, 1, '2021-01-21 17:57:12', '2021-01-21 17:57:12');
INSERT INTO `permissions` VALUES (93, '修改', 'project_templates', '项目模板', '/api/v1/project_templates', 'put', '', 1, 1, 1, '2021-01-21 17:57:15', '2021-01-21 17:57:15');
INSERT INTO `permissions` VALUES (94, '批量删除', 'project_templates', '项目模板', '/api/v1/project_templates', 'delete', '', 1, 1, 1, '2021-01-21 17:57:18', '2021-01-21 17:57:18');
INSERT INTO `permissions` VALUES (95, '列表', 'project_templates', '项目模板', '/api/v1/project_templates/list', 'get', '', 1, 1, 1, '2021-01-21 17:57:25', '2021-01-21 17:57:25');
INSERT INTO `permissions` VALUES (96, '列表', 'project_template_tasks', '项目模板任务', '/api/v1/project_template_tasks/list', 'get', '', 1, 1, 1, '2021-01-21 18:03:26', '2021-01-21 18:03:26');
INSERT INTO `permissions` VALUES (97, '新增', 'project_template_tasks', '项目模板 任务', '/api/v1/project_template_tasks', 'post', '', 1, 1, 1, '2021-01-21 18:04:41', '2021-01-21 18:04:41');
INSERT INTO `permissions` VALUES (98, '详情', 'project_template_tasks', '项目模板 任务', '/api/v1/project_template_tasks', 'get', '', 1, 1, 1, '2021-01-21 18:04:43', '2021-01-21 18:04:43');
INSERT INTO `permissions` VALUES (99, '修改', 'project_template_tasks', '项目模板 任务', '/api/v1/project_template_tasks', 'put', '', 1, 1, 1, '2021-01-21 18:04:46', '2021-01-21 18:04:46');
INSERT INTO `permissions` VALUES (100, '批量删除', 'project_template_tasks', '项目模板 任务', '/api/v1/project_template_tasks', 'delete', '', 1, 1, 1, '2021-01-21 18:04:48', '2021-01-21 18:04:48');
INSERT INTO `permissions` VALUES (101, '新增', 'projects', '项目', '/api/v1/projects', 'post', '', 1, 1, 1, '2021-01-21 18:28:08', '2021-01-21 18:28:08');
INSERT INTO `permissions` VALUES (102, '详情', 'projects', '项目', '/api/v1/projects', 'get', '', 1, 1, 1, '2021-01-21 18:28:10', '2021-01-21 18:28:10');
INSERT INTO `permissions` VALUES (103, '修改', 'projects', '项目', '/api/v1/projects', 'put', '', 1, 1, 1, '2021-01-21 18:28:13', '2021-01-21 18:28:13');
INSERT INTO `permissions` VALUES (104, '批量删除', 'projects', '项目', '/api/v1/projects', 'delete', '', 1, 1, 1, '2021-01-21 18:28:15', '2021-01-21 18:28:15');
INSERT INTO `permissions` VALUES (105, '列表', 'projects', '项目', '/api/v1/projects/list', 'get', '', 1, 1, 1, '2021-01-21 18:28:20', '2021-01-21 18:28:20');
INSERT INTO `permissions` VALUES (106, '新增', 'user_projects', '用户项目关系表', '/api/v1/user_projects', 'post', '', 1, 1, 1, '2021-01-22 14:48:21', '2021-05-13 19:25:04');
INSERT INTO `permissions` VALUES (107, '详情', 'user_projects', '用户项目关系表', '/api/v1/user_projects', 'get', '', 1, 1, 1, '2021-01-22 14:48:23', '2021-01-22 14:48:23');
INSERT INTO `permissions` VALUES (108, '修改', 'user_projects', '用户项目关系表', '/api/v1/user_projects', 'put', '', 1, 1, 1, '2021-01-22 14:48:25', '2021-01-22 14:48:25');
INSERT INTO `permissions` VALUES (109, '批量删除', 'user_projects', '用户项目关系表', '/api/v1/user_projects', 'delete', '', 1, 1, 1, '2021-01-22 14:48:27', '2021-01-22 14:48:27');
INSERT INTO `permissions` VALUES (110, '列表', 'user_projects', '用户项目关系表', '/api/v1/user_projects/list', 'get', '', 1, 1, 1, '2021-01-22 14:48:33', '2021-01-22 14:48:33');
INSERT INTO `permissions` VALUES (111, '刷新token', 'users', '用户', '/api/v1/users/refreshToken', 'post', '', 1, 0, 0, '2021-01-25 16:30:46', '2021-01-25 16:47:52');
INSERT INTO `permissions` VALUES (112, '新增', 'task_lists', '任务列表', '/api/v1/task_lists', 'post', '', 1, 1, 1, '2021-01-28 16:39:36', '2021-01-28 16:39:36');
INSERT INTO `permissions` VALUES (113, '详情', 'task_lists', '任务列表', '/api/v1/task_lists', 'get', '', 1, 1, 1, '2021-01-28 16:39:38', '2021-01-28 16:39:38');
INSERT INTO `permissions` VALUES (114, '修改', 'task_lists', '任务列表', '/api/v1/task_lists', 'put', '', 1, 1, 1, '2021-01-28 16:39:40', '2021-01-28 16:39:40');
INSERT INTO `permissions` VALUES (115, '批量删除', 'task_lists', '任务列表', '/api/v1/task_lists', 'delete', '', 1, 1, 1, '2021-01-28 16:39:43', '2021-01-28 16:39:43');
INSERT INTO `permissions` VALUES (116, '列表', 'task_lists', '任务列表', '/api/v1/task_lists/list', 'get', '', 1, 1, 1, '2021-01-28 16:39:49', '2021-01-28 16:39:49');
INSERT INTO `permissions` VALUES (117, '新增', 'task_prioritys', '任务优先级', '/api/v1/task_prioritys', 'post', '', 1, 1, 1, '2021-02-14 01:11:55', '2021-02-14 01:11:55');
INSERT INTO `permissions` VALUES (118, '详情', 'task_prioritys', '任务优先级', '/api/v1/task_prioritys', 'get', '', 1, 1, 1, '2021-02-14 01:11:58', '2021-02-14 01:11:58');
INSERT INTO `permissions` VALUES (119, '修改', 'task_prioritys', '任务优先级', '/api/v1/task_prioritys', 'put', '', 1, 1, 1, '2021-02-14 01:12:19', '2021-02-14 01:12:19');
INSERT INTO `permissions` VALUES (120, '批量删除', 'task_prioritys', '任务优先级', '/api/v1/task_prioritys', 'delete', '', 1, 1, 1, '2021-02-14 01:12:22', '2021-02-14 01:12:22');
INSERT INTO `permissions` VALUES (121, '列表', 'task_prioritys', '任务优先级', '/api/v1/task_prioritys/list', 'get', '', 1, 1, 1, '2021-02-14 01:12:29', '2021-02-14 01:12:29');
INSERT INTO `permissions` VALUES (122, '新增', 'task_states', '任务状态', '/api/v1/task_states', 'post', '', 1, 1, 1, '2021-02-14 01:52:34', '2021-02-14 01:52:34');
INSERT INTO `permissions` VALUES (123, '详情', 'task_states', '任务状态', '/api/v1/task_states', 'get', '', 1, 1, 1, '2021-02-14 01:52:37', '2021-02-14 01:52:37');
INSERT INTO `permissions` VALUES (124, '修改', 'task_states', '任务状态', '/api/v1/task_states', 'put', '', 1, 1, 1, '2021-02-14 01:52:39', '2021-02-14 01:52:39');
INSERT INTO `permissions` VALUES (125, '批量删除', 'task_states', '任务状态', '/api/v1/task_states', 'delete', '', 1, 1, 1, '2021-02-14 01:52:41', '2021-02-14 01:52:41');
INSERT INTO `permissions` VALUES (126, '列表', 'task_states', '任务状态', '/api/v1/task_states/list', 'get', '', 1, 1, 1, '2021-02-14 01:52:47', '2021-02-14 01:52:47');
INSERT INTO `permissions` VALUES (127, '新增', 'task_types', '任务类型', '/api/v1/task_types', 'post', '', 1, 1, 1, '2021-02-14 01:57:49', '2021-02-14 01:57:49');
INSERT INTO `permissions` VALUES (128, '详情', 'task_types', '任务类型', '/api/v1/task_types', 'get', '', 1, 1, 1, '2021-02-14 01:57:51', '2021-02-14 01:57:51');
INSERT INTO `permissions` VALUES (129, '修改', 'task_types', '任务类型', '/api/v1/task_types', 'put', '', 1, 1, 1, '2021-02-14 01:57:53', '2021-02-14 01:57:53');
INSERT INTO `permissions` VALUES (130, '批量删除', 'task_types', '任务类型', '/api/v1/task_types', 'delete', '', 1, 1, 1, '2021-02-14 01:57:55', '2021-02-14 01:57:55');
INSERT INTO `permissions` VALUES (131, '列表', 'task_types', '任务类型', '/api/v1/task_types/list', 'get', '', 1, 1, 1, '2021-02-14 01:58:01', '2021-02-14 01:58:01');
INSERT INTO `permissions` VALUES (132, '新增', 'tasks', '任务', '/api/v1/tasks', 'post', '', 1, 1, 1, '2021-02-14 02:19:51', '2021-02-14 02:19:51');
INSERT INTO `permissions` VALUES (133, '详情', 'tasks', '任务', '/api/v1/tasks', 'get', '', 1, 1, 1, '2021-02-14 02:19:53', '2021-02-14 02:19:53');
INSERT INTO `permissions` VALUES (134, '修改', 'tasks', '任务', '/api/v1/tasks', 'put', '', 1, 1, 1, '2021-02-14 02:19:55', '2021-02-14 02:19:55');
INSERT INTO `permissions` VALUES (135, '批量删除', 'tasks', '任务', '/api/v1/tasks', 'delete', '', 1, 1, 1, '2021-02-14 02:19:57', '2021-02-14 02:19:57');
INSERT INTO `permissions` VALUES (136, '列表', 'tasks', '任务', '/api/v1/tasks/list', 'get', '', 1, 1, 1, '2021-02-14 02:20:03', '2021-02-14 02:20:03');
INSERT INTO `permissions` VALUES (137, '更新任务排序', 'tasks', '任务', '/api/v1/tasks/sort', 'put', '', 1, 1, 1, '2021-02-15 02:13:55', '2021-02-15 02:13:55');
INSERT INTO `permissions` VALUES (138, '新增', 'task_tags', '任务标签', '/api/v1/task_tags', 'post', '', 1, 1, 1, '2021-02-18 17:11:13', '2021-02-18 17:11:13');
INSERT INTO `permissions` VALUES (139, '详情', 'task_tags', '任务标签', '/api/v1/task_tags', 'get', '', 1, 1, 1, '2021-02-18 17:11:15', '2021-02-18 17:11:15');
INSERT INTO `permissions` VALUES (140, '修改', 'task_tags', '任务标签', '/api/v1/task_tags', 'put', '', 1, 1, 1, '2021-02-18 17:11:17', '2021-02-18 17:11:17');
INSERT INTO `permissions` VALUES (141, '批量删除', 'task_tags', '任务标签', '/api/v1/task_tags', 'delete', '', 1, 1, 1, '2021-02-18 17:11:20', '2021-02-18 17:11:20');
INSERT INTO `permissions` VALUES (142, '列表', 'task_tags', '任务标签', '/api/v1/task_tags/list', 'get', '', 1, 1, 1, '2021-02-18 17:11:25', '2021-02-18 17:11:25');
INSERT INTO `permissions` VALUES (143, '新增', 'task_task_tags', '任务-任务标签关系表', '/api/v1/task_task_tags', 'post', '', 1, 1, 1, '2021-02-18 17:29:11', '2021-02-18 17:29:11');
INSERT INTO `permissions` VALUES (144, '详情', 'task_task_tags', '任务-任务标签关系表', '/api/v1/task_task_tags', 'get', '', 1, 1, 1, '2021-02-18 17:29:13', '2021-02-18 17:29:13');
INSERT INTO `permissions` VALUES (145, '修改', 'task_task_tags', '任务-任务标签关系表', '/api/v1/task_task_tags', 'put', '', 1, 1, 1, '2021-02-18 17:29:16', '2021-02-18 17:29:16');
INSERT INTO `permissions` VALUES (146, '批量删除', 'task_task_tags', '任务-任务标签关系表', '/api/v1/task_task_tags', 'delete', '', 1, 1, 1, '2021-02-18 17:29:18', '2021-02-18 17:29:18');
INSERT INTO `permissions` VALUES (147, '列表', 'task_task_tags', '任务-任务标签关系表', '/api/v1/task_task_tags/list', 'get', '', 1, 1, 1, '2021-02-18 17:29:24', '2021-02-18 17:29:24');
INSERT INTO `permissions` VALUES (148, '创建或删除', 'task_task_tags', '任务-任务标签关系表', '/api/v1/task_task_tags/change', 'post', '', 1, 1, 1, '2021-02-18 22:57:55', '2021-02-18 22:57:55');
INSERT INTO `permissions` VALUES (150, '创建或删除', 'user_tasks', '用户-任务关系表', '/api/v1/user_tasks/change', 'post', '', 1, 1, 1, '2021-02-22 17:47:41', '2021-02-22 17:47:41');
INSERT INTO `permissions` VALUES (151, '新增', 'task_logs', '任务日志', '/api/v1/task_logs', 'post', '', 1, 1, 1, '2021-02-23 17:12:21', '2021-02-23 17:12:21');
INSERT INTO `permissions` VALUES (152, '修改', 'task_logs', '任务日志', '/api/v1/task_logs', 'put', '', 1, 1, 1, '2021-02-23 17:12:29', '2021-02-23 17:12:29');
INSERT INTO `permissions` VALUES (153, '批量删除', 'task_logs', '任务日志', '/api/v1/task_logs', 'delete', '', 1, 1, 1, '2021-02-23 17:12:31', '2021-02-23 17:12:31');
INSERT INTO `permissions` VALUES (154, '列表', 'task_logs', '任务日志', '/api/v1/task_logs/list', 'get', '', 1, 1, 1, '2021-02-23 17:12:40', '2021-02-23 17:12:40');
INSERT INTO `permissions` VALUES (155, '新增', 'task_working_hours', '任务工时', '/api/v1/task_working_hours', 'post', '', 1, 1, 1, '2021-03-01 18:34:16', '2021-03-01 18:34:16');
INSERT INTO `permissions` VALUES (156, '修改', 'task_working_hours', '任务工时', '/api/v1/task_working_hours', 'put', '', 1, 1, 1, '2021-03-01 18:34:24', '2021-03-01 18:34:24');
INSERT INTO `permissions` VALUES (157, '批量删除', 'task_working_hours', '任务工时', '/api/v1/task_working_hours', 'delete', '', 1, 1, 1, '2021-03-01 18:34:26', '2021-03-01 18:34:26');
INSERT INTO `permissions` VALUES (158, '列表', 'task_working_hours', '任务工时', '/api/v1/task_working_hours/list', 'get', '', 1, 1, 1, '2021-03-01 18:34:31', '2021-03-01 18:34:31');
INSERT INTO `permissions` VALUES (159, '新增', 'project_files', '项目文件', '/api/v1/project_files', 'post', '', 1, 1, 1, '2021-03-02 15:56:46', '2021-03-02 15:56:46');
INSERT INTO `permissions` VALUES (160, '详情', 'project_files', '项目文件', '/api/v1/project_files', 'get', '', 1, 1, 1, '2021-03-02 15:56:48', '2021-03-02 15:56:48');
INSERT INTO `permissions` VALUES (161, '修改', 'project_files', '项目文件', '/api/v1/project_files', 'put', '', 1, 1, 1, '2021-03-02 15:56:51', '2021-03-02 15:56:51');
INSERT INTO `permissions` VALUES (162, '批量删除', 'project_files', '项目文件', '/api/v1/project_files', 'delete', '', 1, 1, 1, '2021-03-02 15:56:53', '2021-03-02 15:56:53');
INSERT INTO `permissions` VALUES (163, '列表', 'project_files', '项目文件', '/api/v1/project_files/list', 'get', '', 1, 1, 1, '2021-03-02 15:56:58', '2021-03-02 15:56:58');
INSERT INTO `permissions` VALUES (164, '创建或删除', 'user_project_collects', '用户-项目-收藏关系表', '/api/v1/user_project_collects/change', 'post', '', 1, 1, 1, '2021-03-02 16:50:02', '2021-03-02 16:50:02');
INSERT INTO `permissions` VALUES (165, '新增', 'messages', '站内信', '/api/v1/messages', 'post', '', 1, 1, 1, '2021-03-12 17:16:00', '2021-03-12 17:16:00');
INSERT INTO `permissions` VALUES (166, '详情', 'messages', '站内信', '/api/v1/messages', 'get', '', 1, 1, 1, '2021-03-12 17:16:03', '2021-03-12 17:16:03');
INSERT INTO `permissions` VALUES (167, '修改', 'messages', '站内信', '/api/v1/messages', 'put', '', 1, 1, 1, '2021-03-12 17:16:06', '2021-03-12 17:16:06');
INSERT INTO `permissions` VALUES (168, '批量删除', 'messages', '站内信', '/api/v1/messages', 'delete', '', 1, 1, 1, '2021-03-12 17:16:07', '2021-03-12 17:16:07');
INSERT INTO `permissions` VALUES (169, '列表', 'messages', '站内信', '/api/v1/messages/list', 'get', '', 1, 1, 1, '2021-03-12 17:16:13', '2021-03-12 17:16:13');
INSERT INTO `permissions` VALUES (170, 'github授权登录', 'users', '用户', '/api/v1/users/github/login', 'post', '', 1, 0, 0, '2021-03-17 15:08:07', '2021-03-17 15:09:35');
INSERT INTO `permissions` VALUES (171, '将任务列表中的所有任务移到回收站', 'tasks', '任务', '/api/v1/tasks/recycle_all_task_of_taskList', 'put', '', 1, 1, 1, '2021-03-23 14:41:34', '2021-03-23 14:41:34');
INSERT INTO `permissions` VALUES (172, '更新任务列表排序', 'task_lists', '任务列表', '/api/v1/task_lists/sort', 'put', '', 1, 1, 1, '2021-03-24 17:59:07', '2021-03-24 17:59:07');
INSERT INTO `permissions` VALUES (173, '新增', 'invites', '邀请', '/api/v1/invites', 'post', '', 1, 1, 1, '2021-04-22 16:09:22', '2021-04-22 16:09:22');
INSERT INTO `permissions` VALUES (174, '详情', 'invites', '邀请', '/api/v1/invites', 'get', '', 1, 1, 1, '2021-04-22 16:09:29', '2021-04-22 16:09:29');
INSERT INTO `permissions` VALUES (175, '修改', 'invites', '邀请', '/api/v1/invites', 'put', '', 1, 1, 1, '2021-04-22 16:09:32', '2021-04-22 16:09:32');
INSERT INTO `permissions` VALUES (176, '批量删除', 'invites', '邀请', '/api/v1/invites', 'delete', '', 1, 1, 1, '2021-04-22 16:09:35', '2021-04-22 16:09:35');
INSERT INTO `permissions` VALUES (177, '列表', 'invites', '邀请', '/api/v1/invites/list', 'get', '', 1, 1, 1, '2021-04-22 16:09:43', '2021-04-22 16:09:43');
INSERT INTO `permissions` VALUES (178, '获取某个可用的邀请', 'invites', '邀请', '/api/v1/invites/valid', 'get', '', 1, 1, 1, '2021-04-22 17:27:45', '2021-04-22 17:27:45');
INSERT INTO `permissions` VALUES (179, '通过uuid获取详情', 'invites', '邀请', '/api/v1/invites/uuid', 'get', '', 1, 1, 1, '2021-04-22 20:12:40', '2021-04-22 20:12:40');
INSERT INTO `permissions` VALUES (180, '新增', 'operation_logs', '操作日志', '/api/v1/operation_logs', 'post', '', 1, 1, 1, '2021-04-30 18:11:58', '2021-04-30 18:11:58');
INSERT INTO `permissions` VALUES (181, '详情', 'operation_logs', '操作日志', '/api/v1/operation_logs', 'get', '', 1, 1, 1, '2021-04-30 18:12:01', '2021-04-30 18:12:01');
INSERT INTO `permissions` VALUES (182, '修改', 'operation_logs', '操作日志', '/api/v1/operation_logs', 'put', '', 1, 1, 1, '2021-04-30 18:12:04', '2021-04-30 18:12:04');
INSERT INTO `permissions` VALUES (183, '批量删除', 'operation_logs', '操作日志', '/api/v1/operation_logs', 'delete', '', 1, 1, 1, '2021-04-30 18:12:06', '2021-04-30 18:12:06');
INSERT INTO `permissions` VALUES (184, '列表', 'operation_logs', '操作日志', '/api/v1/operation_logs/list', 'get', '', 1, 1, 1, '2021-04-30 18:12:12', '2021-04-30 18:12:12');
INSERT INTO `permissions` VALUES (185, '获取某个 项目统计', 'projects', '项目', '/api/v1/projects/statistics', 'get', '', 1, 1, 1, '2021-05-10 20:10:26', '2021-05-10 20:10:26');
INSERT INTO `permissions` VALUES (186, '删除 用户-项目关系 用户退出项目', 'user_projects', '用户项目关系表', '/api/v1/user_projects/quit', 'delete', '', 1, 1, 1, '2021-05-12 17:43:36', '2021-05-12 17:43:36');
INSERT INTO `permissions` VALUES (188, '接受 邀请', 'invites', '邀请', '/api/v1/invites/accept', 'put', '', 1, 1, 1, '2021-05-13 16:56:13', '2021-05-13 16:56:13');
INSERT INTO `permissions` VALUES (189, '创建或删除', 'user_task_likes', '用户-任务-点赞关系表', '/api/v1/user_task_likes/change', 'post', '', 1, 1, 1, '2021-05-18 16:05:10', '2021-05-18 16:05:10');

-- ----------------------------
-- Table structure for project_files
-- ----------------------------
DROP TABLE IF EXISTS `project_files`;
CREATE TABLE `project_files`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件标题',
  `project_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '项目ID',
  `task_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '任务ID',
  `creator_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建人ID',
  `filename` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件名',
  `path` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路径名',
  `extension` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件扩展名',
  `file_type` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件类型',
  `size` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文件容量',
  `downloads` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '下载次数',
  `is_recycle` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否进入回收站.1为true,0为false',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '逻辑删除',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  INDEX `task_id`(`task_id`) USING BTREE,
  INDEX `creator_id`(`creator_id`) USING BTREE,
  CONSTRAINT `project_files_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_files_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_files_ibfk_3` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_files
-- ----------------------------

-- ----------------------------
-- Table structure for project_template_tasks
-- ----------------------------
DROP TABLE IF EXISTS `project_template_tasks`;
CREATE TABLE `project_template_tasks`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目模板名称',
  `project_template_id` int(11) UNSIGNED NOT NULL COMMENT '所属项目模板ID',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序，越大越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `project_template_id`(`project_template_id`) USING BTREE,
  CONSTRAINT `project_template_tasks_ibfk_1` FOREIGN KEY (`project_template_id`) REFERENCES `project_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_template_tasks
-- ----------------------------
INSERT INTO `project_template_tasks` VALUES (28, '已完成&归档', 1, 100, '2021-01-27 16:14:33', '2021-01-27 16:31:50');
INSERT INTO `project_template_tasks` VALUES (29, '评估确认', 1, 200, '2021-01-27 16:14:51', '2021-01-27 16:32:45');
INSERT INTO `project_template_tasks` VALUES (30, '需求收集', 1, 300, '2021-01-27 16:15:08', '2021-01-27 16:32:38');
INSERT INTO `project_template_tasks` VALUES (31, '发布成功', 17, 100, '2021-01-27 16:23:17', '2021-01-27 16:33:51');
INSERT INTO `project_template_tasks` VALUES (32, '测试', 17, 120, '2021-01-27 16:23:20', '2021-01-27 16:34:08');
INSERT INTO `project_template_tasks` VALUES (33, '准备发布', 17, 110, '2021-01-27 16:23:25', '2021-01-27 16:34:00');
INSERT INTO `project_template_tasks` VALUES (35, '通知用户', 1, 110, '2021-01-27 16:32:19', '2021-01-27 16:32:27');
INSERT INTO `project_template_tasks` VALUES (36, '内测中', 1, 120, '2021-01-27 16:32:57', '2021-01-27 16:32:57');
INSERT INTO `project_template_tasks` VALUES (37, '研发中', 1, 130, '2021-01-27 16:33:08', '2021-01-27 16:33:08');
INSERT INTO `project_template_tasks` VALUES (38, '需求暂缓', 1, 140, '2021-01-27 16:33:16', '2021-01-27 16:33:16');
INSERT INTO `project_template_tasks` VALUES (39, '即将发布', 17, 130, '2021-01-27 16:34:16', '2021-01-27 16:34:16');
INSERT INTO `project_template_tasks` VALUES (40, '产品计划', 17, 140, '2021-01-27 16:34:24', '2021-01-27 16:34:24');
INSERT INTO `project_template_tasks` VALUES (41, '调研', 18, 1000, '2021-01-27 16:38:09', '2021-01-27 16:38:09');
INSERT INTO `project_template_tasks` VALUES (42, '设计', 18, 900, '2021-01-27 16:38:27', '2021-01-27 16:38:27');
INSERT INTO `project_template_tasks` VALUES (43, '开发', 18, 800, '2021-01-27 16:38:35', '2021-01-27 16:38:35');
INSERT INTO `project_template_tasks` VALUES (47, '测试', 18, 700, '2021-01-27 16:39:35', '2021-01-27 16:39:35');
INSERT INTO `project_template_tasks` VALUES (48, '部署', 18, 600, '2021-01-27 16:40:40', '2021-01-27 16:40:40');

-- ----------------------------
-- Table structure for project_templates
-- ----------------------------
DROP TABLE IF EXISTS `project_templates`;
CREATE TABLE `project_templates`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目模板名称',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目模板封面',
  `is_custom` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否为自定义模板.1为true,0为false',
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '简介',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_templates
-- ----------------------------
INSERT INTO `project_templates` VALUES (1, '需求管理', '/remote_public\\public\\uploads\\1611744392471_307805256.jpg', 0, '', '2021-01-26 20:46:21', '2021-01-27 18:46:34');
INSERT INTO `project_templates` VALUES (17, '产品进展', '/remote_public\\public\\uploads\\1611748044743_202363848.jpg', 0, '', '2021-01-27 16:23:08', '2021-01-27 19:47:26');
INSERT INTO `project_templates` VALUES (18, '完整开发流程', '\\public\\uploads\\20210507214956_133161844.jpg', 1, '', '2021-01-27 16:37:49', '2021-05-07 21:49:58');
INSERT INTO `project_templates` VALUES (19, '333', '/remote_public\\public\\uploads\\1611741452935_985524024.jpg', 1, '', '2021-01-27 17:57:34', '2021-05-07 21:50:14');
INSERT INTO `project_templates` VALUES (27, '对对对', '\\public\\uploads\\20210507215211_115522966.jpg', 1, '', '2021-05-07 21:52:15', '2021-05-07 21:52:15');
INSERT INTO `project_templates` VALUES (28, '啊啊', '\\public\\uploads\\20210507215437_517686780.jpg', 1, '', '2021-05-07 21:52:23', '2021-05-07 21:54:38');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目名称',
  `parent_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父ID',
  `manager_id` int(11) UNSIGNED NOT NULL COMMENT '管理者ID',
  `project_template_id` int(11) NOT NULL COMMENT '创建时使用的模板ID',
  `progress` int(11) NOT NULL DEFAULT 0 COMMENT '项目进度0-100',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目封面',
  `is_private` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否为私有项目.1为true,0为false',
  `is_recycle` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否进入回收站.1为true,0为false',
  `is_archived` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否已归档.1为true,0为false',
  `is_auto_progress` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否自动更新项目进度.1为true,0为false',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '项目状态.1为正常、2为已归档、3为已在回收站',
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '简介',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `manager_id`(`manager_id`) USING BTREE,
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1000065 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (1000059, 'root的私有项目', 0, 2, 18, 0, 'https://i.picsum.photos/id/352/290/160.jpg?hmac=K3lrnBxq7J1FdHgDZZ3x_H7E5_f6apyUwqwa-r8vyYk', 1, 0, 0, 0, 1, '', '2021-09-10 02:26:46', '2021-09-13 01:32:36');
INSERT INTO `projects` VALUES (1000060, 'admin的私有项目', 0, 1, 18, 0, 'https://i.picsum.photos/id/551/290/160.jpg?hmac=KDOEh-CbBrSnlp0-fuFKGVOArFIl7iszUCbBHdyv-qg', 1, 0, 0, 0, 1, '', '2021-09-10 02:29:24', '2021-09-12 10:40:40');
INSERT INTO `projects` VALUES (1000064, 'Beehive 新手引导', 0, 1, 18, 6, 'https://i.picsum.photos/id/399/290/160.jpg?hmac=3xULt6wNyF5o6cyMNb9Whr8XKjwrGAGKErAeJyDjKVQ', 0, 0, 0, 1, 1, '新手引导项目', '2021-09-13 01:37:50', '2021-09-13 01:53:23');

-- ----------------------------
-- Table structure for role_menus
-- ----------------------------
DROP TABLE IF EXISTS `role_menus`;
CREATE TABLE `role_menus`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `menu_id` int(11) UNSIGNED NOT NULL COMMENT '菜单ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `role_menus_ibfk_2`(`menu_id`) USING BTREE,
  CONSTRAINT `role_menus_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `role_menus_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 102 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menus
-- ----------------------------
INSERT INTO `role_menus` VALUES (13, 1, 1, '2020-07-27 19:12:33', '2020-07-27 19:12:33');
INSERT INTO `role_menus` VALUES (16, 1, 8, '2020-07-27 19:14:33', '2020-07-27 19:14:33');
INSERT INTO `role_menus` VALUES (18, 1, 2, '2020-07-27 19:14:33', '2020-07-27 19:14:33');
INSERT INTO `role_menus` VALUES (21, 1, 15, '2020-07-27 19:49:41', '2020-07-27 19:49:41');
INSERT INTO `role_menus` VALUES (22, 1, 9, '2020-07-27 19:49:41', '2020-07-27 19:49:41');
INSERT INTO `role_menus` VALUES (23, 1, 10, '2020-07-27 19:49:41', '2020-07-27 19:49:41');
INSERT INTO `role_menus` VALUES (24, 2, 1, '2020-07-27 20:30:37', '2020-07-27 20:30:37');
INSERT INTO `role_menus` VALUES (25, 2, 15, '2020-07-27 20:30:37', '2020-07-27 20:30:37');
INSERT INTO `role_menus` VALUES (36, 1, 18, '2020-07-31 00:46:40', '2020-07-31 00:46:40');
INSERT INTO `role_menus` VALUES (38, 1, 22, '2020-08-04 21:42:15', '2020-08-04 21:42:15');
INSERT INTO `role_menus` VALUES (39, 1, 23, '2020-08-04 21:42:15', '2020-08-04 21:42:15');
INSERT INTO `role_menus` VALUES (40, 1, 25, '2020-11-26 15:21:48', '2020-11-26 15:21:48');
INSERT INTO `role_menus` VALUES (41, 1, 26, '2020-11-26 15:32:31', '2020-11-26 15:32:31');
INSERT INTO `role_menus` VALUES (42, 2, 22, '2020-11-26 15:46:07', '2020-11-26 15:46:07');
INSERT INTO `role_menus` VALUES (43, 2, 23, '2020-11-26 15:46:07', '2020-11-26 15:46:07');
INSERT INTO `role_menus` VALUES (44, 2, 25, '2020-11-26 15:46:07', '2020-11-26 15:46:07');
INSERT INTO `role_menus` VALUES (45, 2, 26, '2020-11-26 15:46:07', '2020-11-26 15:46:07');
INSERT INTO `role_menus` VALUES (46, 1, 27, '2021-01-21 20:09:10', '2021-01-21 20:09:10');
INSERT INTO `role_menus` VALUES (52, 1, 33, '2021-01-22 18:41:33', '2021-01-22 18:41:33');
INSERT INTO `role_menus` VALUES (53, 1, 34, '2021-02-01 20:25:57', '2021-02-01 20:25:57');
INSERT INTO `role_menus` VALUES (54, 1, 32, '2021-04-08 20:54:57', '2021-04-08 20:54:57');
INSERT INTO `role_menus` VALUES (55, 1, 28, '2021-04-08 20:54:57', '2021-04-08 20:54:57');
INSERT INTO `role_menus` VALUES (56, 1, 29, '2021-04-08 20:54:57', '2021-04-08 20:54:57');
INSERT INTO `role_menus` VALUES (57, 1, 30, '2021-04-08 20:54:57', '2021-04-08 20:54:57');
INSERT INTO `role_menus` VALUES (58, 1, 31, '2021-04-08 20:54:57', '2021-04-08 20:54:57');
INSERT INTO `role_menus` VALUES (59, 2, 27, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (60, 2, 32, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (61, 2, 28, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (62, 2, 29, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (63, 2, 30, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (64, 2, 31, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (65, 2, 33, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (66, 2, 34, '2021-04-13 14:48:33', '2021-04-13 14:48:33');
INSERT INTO `role_menus` VALUES (67, 2, 2, '2021-04-17 18:43:06', '2021-04-17 18:43:06');
INSERT INTO `role_menus` VALUES (68, 2, 8, '2021-04-17 18:43:06', '2021-04-17 18:43:06');
INSERT INTO `role_menus` VALUES (69, 2, 9, '2021-04-17 18:43:06', '2021-04-17 18:43:06');
INSERT INTO `role_menus` VALUES (70, 2, 10, '2021-04-17 18:43:06', '2021-04-17 18:43:06');
INSERT INTO `role_menus` VALUES (71, 2, 18, '2021-04-17 18:43:06', '2021-04-17 18:43:06');
INSERT INTO `role_menus` VALUES (72, 2, 35, '2021-04-21 17:32:44', '2021-04-21 17:32:44');
INSERT INTO `role_menus` VALUES (73, 2, 36, '2021-04-21 17:32:44', '2021-04-21 17:32:44');
INSERT INTO `role_menus` VALUES (74, 1, 35, '2021-04-21 17:32:48', '2021-04-21 17:32:48');
INSERT INTO `role_menus` VALUES (75, 1, 36, '2021-04-21 17:32:48', '2021-04-21 17:32:48');
INSERT INTO `role_menus` VALUES (76, 1, 37, '2021-05-06 11:50:28', '2021-05-06 11:50:28');
INSERT INTO `role_menus` VALUES (77, 2, 37, '2021-05-06 11:50:33', '2021-05-06 11:50:33');
INSERT INTO `role_menus` VALUES (78, 1, 38, '2021-07-07 17:21:07', '2021-07-07 17:21:07');
INSERT INTO `role_menus` VALUES (79, 1, 39, '2021-07-07 17:21:07', '2021-07-07 17:21:07');
INSERT INTO `role_menus` VALUES (80, 1, 40, '2021-07-07 17:21:07', '2021-07-07 17:21:07');
INSERT INTO `role_menus` VALUES (81, 1, 41, '2021-07-07 17:21:07', '2021-07-07 17:21:07');
INSERT INTO `role_menus` VALUES (82, 17, 1, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (83, 17, 15, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (84, 17, 22, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (85, 17, 23, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (86, 17, 25, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (87, 17, 26, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (88, 17, 27, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (89, 17, 32, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (90, 17, 28, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (91, 17, 29, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (92, 17, 30, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (93, 17, 31, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (94, 17, 33, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (95, 17, 34, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (96, 17, 38, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (97, 17, 39, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (98, 17, 40, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (99, 17, 41, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (100, 17, 35, '2021-09-09 00:20:10', '2021-09-09 00:20:10');
INSERT INTO `role_menus` VALUES (101, 17, 36, '2021-09-09 00:20:10', '2021-09-09 00:20:10');

-- ----------------------------
-- Table structure for role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `permission_id` int(11) UNSIGNED NOT NULL COMMENT '资源ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `role_permissions_ibfk_2`(`permission_id`) USING BTREE,
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 686 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permissions
-- ----------------------------
INSERT INTO `role_permissions` VALUES (22, 1, 1, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (23, 1, 2, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (24, 1, 3, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (25, 1, 4, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (26, 1, 5, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (27, 1, 9, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (28, 1, 10, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (29, 1, 11, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (30, 1, 12, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (31, 1, 13, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (32, 1, 14, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (33, 1, 15, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (34, 1, 16, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (35, 1, 17, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (36, 1, 18, '2020-07-31 22:19:19', '2020-07-31 22:19:19');
INSERT INTO `role_permissions` VALUES (38, 1, 26, '2020-08-03 19:08:48', '2020-08-03 19:08:48');
INSERT INTO `role_permissions` VALUES (39, 1, 23, '2020-08-03 19:09:02', '2020-08-03 19:09:02');
INSERT INTO `role_permissions` VALUES (40, 1, 27, '2020-08-03 20:31:48', '2020-08-03 20:31:48');
INSERT INTO `role_permissions` VALUES (41, 1, 28, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (43, 1, 30, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (44, 1, 19, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (45, 1, 21, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (46, 1, 31, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (47, 1, 32, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (49, 1, 20, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (50, 1, 37, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (51, 1, 38, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (52, 1, 39, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (53, 1, 40, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (55, 1, 22, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (56, 1, 25, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (57, 1, 34, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (58, 1, 35, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (59, 1, 36, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (60, 1, 42, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (61, 1, 43, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (62, 1, 44, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (63, 1, 45, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (64, 1, 46, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (65, 1, 47, '2020-08-03 21:22:27', '2020-08-03 21:22:27');
INSERT INTO `role_permissions` VALUES (75, 2, 1, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (76, 2, 2, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (77, 2, 3, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (78, 2, 4, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (79, 2, 23, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (80, 2, 28, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (81, 2, 29, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (82, 2, 30, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (83, 2, 48, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (84, 2, 56, '2020-09-09 16:38:40', '2020-09-09 16:38:40');
INSERT INTO `role_permissions` VALUES (92, 2, 9, '2020-09-09 20:38:12', '2020-09-09 20:38:12');
INSERT INTO `role_permissions` VALUES (94, 1, 49, '2020-09-14 20:41:40', '2020-09-14 20:41:40');
INSERT INTO `role_permissions` VALUES (95, 1, 50, '2020-09-15 19:47:09', '2020-09-15 19:47:09');
INSERT INTO `role_permissions` VALUES (100, 1, 79, '2020-09-18 11:04:30', '2020-09-18 11:04:30');
INSERT INTO `role_permissions` VALUES (101, 1, 48, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (102, 1, 56, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (103, 1, 51, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (104, 1, 52, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (105, 1, 53, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (106, 1, 54, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (107, 1, 55, '2020-09-18 11:04:41', '2020-09-18 11:04:41');
INSERT INTO `role_permissions` VALUES (108, 2, 20, '2020-09-18 14:37:07', '2020-09-18 14:37:07');
INSERT INTO `role_permissions` VALUES (109, 2, 37, '2020-09-18 15:26:59', '2020-09-18 15:26:59');
INSERT INTO `role_permissions` VALUES (110, 2, 38, '2020-09-18 15:26:59', '2020-09-18 15:26:59');
INSERT INTO `role_permissions` VALUES (111, 2, 39, '2020-09-18 15:27:52', '2020-09-18 15:27:52');
INSERT INTO `role_permissions` VALUES (124, 2, 40, '2020-09-18 16:20:57', '2020-09-18 16:20:57');
INSERT INTO `role_permissions` VALUES (137, 2, 5, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (138, 2, 10, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (139, 2, 11, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (140, 2, 12, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (141, 2, 79, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (142, 2, 13, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (143, 2, 14, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (144, 2, 15, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (145, 2, 16, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (146, 2, 17, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (147, 2, 18, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (148, 2, 19, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (149, 2, 21, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (150, 2, 27, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (151, 2, 31, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (152, 2, 32, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (158, 2, 35, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (159, 2, 36, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (161, 2, 43, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (162, 2, 44, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (164, 2, 46, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (166, 2, 49, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (167, 2, 50, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (168, 2, 51, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (169, 2, 52, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (170, 2, 53, '2020-09-18 16:46:48', '2020-09-18 16:46:48');
INSERT INTO `role_permissions` VALUES (333, 17, 1, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (334, 17, 2, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (335, 17, 3, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (336, 17, 4, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (337, 17, 28, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (338, 17, 30, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (339, 17, 56, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (340, 17, 20, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (341, 17, 55, '2020-09-28 20:39:50', '2020-09-28 20:39:50');
INSERT INTO `role_permissions` VALUES (348, 1, 80, '2020-11-16 14:36:03', '2020-11-16 14:36:03');
INSERT INTO `role_permissions` VALUES (350, 1, 82, '2020-11-16 14:36:03', '2020-11-16 14:36:03');
INSERT INTO `role_permissions` VALUES (356, 1, 41, '2020-11-16 16:59:42', '2020-11-16 16:59:42');
INSERT INTO `role_permissions` VALUES (357, 2, 41, '2020-11-16 16:59:44', '2020-11-16 16:59:44');
INSERT INTO `role_permissions` VALUES (358, 1, 83, '2020-11-17 14:52:18', '2020-11-17 14:52:18');
INSERT INTO `role_permissions` VALUES (359, 1, 84, '2020-11-17 14:52:18', '2020-11-17 14:52:18');
INSERT INTO `role_permissions` VALUES (360, 1, 85, '2020-11-17 14:52:18', '2020-11-17 14:52:18');
INSERT INTO `role_permissions` VALUES (361, 1, 86, '2020-11-17 14:52:18', '2020-11-17 14:52:18');
INSERT INTO `role_permissions` VALUES (362, 1, 87, '2020-11-17 14:52:18', '2020-11-17 14:52:18');
INSERT INTO `role_permissions` VALUES (363, 1, 88, '2020-11-17 16:00:19', '2020-11-17 16:00:19');
INSERT INTO `role_permissions` VALUES (365, 1, 90, '2021-01-18 20:41:28', '2021-01-18 20:41:28');
INSERT INTO `role_permissions` VALUES (366, 1, 91, '2021-01-21 17:57:34', '2021-01-21 17:57:34');
INSERT INTO `role_permissions` VALUES (367, 1, 92, '2021-01-21 17:57:34', '2021-01-21 17:57:34');
INSERT INTO `role_permissions` VALUES (368, 1, 93, '2021-01-21 17:57:34', '2021-01-21 17:57:34');
INSERT INTO `role_permissions` VALUES (369, 1, 94, '2021-01-21 17:57:34', '2021-01-21 17:57:34');
INSERT INTO `role_permissions` VALUES (370, 1, 95, '2021-01-21 17:57:34', '2021-01-21 17:57:34');
INSERT INTO `role_permissions` VALUES (371, 1, 96, '2021-01-21 18:03:36', '2021-01-21 18:03:36');
INSERT INTO `role_permissions` VALUES (372, 1, 97, '2021-01-21 18:04:57', '2021-01-21 18:04:57');
INSERT INTO `role_permissions` VALUES (373, 1, 98, '2021-01-21 18:04:57', '2021-01-21 18:04:57');
INSERT INTO `role_permissions` VALUES (374, 1, 99, '2021-01-21 18:04:57', '2021-01-21 18:04:57');
INSERT INTO `role_permissions` VALUES (375, 1, 100, '2021-01-21 18:04:57', '2021-01-21 18:04:57');
INSERT INTO `role_permissions` VALUES (376, 1, 101, '2021-01-21 18:28:29', '2021-01-21 18:28:29');
INSERT INTO `role_permissions` VALUES (377, 1, 102, '2021-01-21 18:28:29', '2021-01-21 18:28:29');
INSERT INTO `role_permissions` VALUES (378, 1, 103, '2021-01-21 18:28:29', '2021-01-21 18:28:29');
INSERT INTO `role_permissions` VALUES (379, 1, 104, '2021-01-21 18:28:29', '2021-01-21 18:28:29');
INSERT INTO `role_permissions` VALUES (380, 1, 105, '2021-01-21 18:28:29', '2021-01-21 18:28:29');
INSERT INTO `role_permissions` VALUES (381, 1, 106, '2021-01-22 14:48:42', '2021-01-22 14:48:42');
INSERT INTO `role_permissions` VALUES (382, 1, 107, '2021-01-22 14:48:42', '2021-01-22 14:48:42');
INSERT INTO `role_permissions` VALUES (383, 1, 108, '2021-01-22 14:48:42', '2021-01-22 14:48:42');
INSERT INTO `role_permissions` VALUES (384, 1, 109, '2021-01-22 14:48:42', '2021-01-22 14:48:42');
INSERT INTO `role_permissions` VALUES (385, 1, 110, '2021-01-22 14:48:42', '2021-01-22 14:48:42');
INSERT INTO `role_permissions` VALUES (386, 1, 111, '2021-01-25 16:32:17', '2021-01-25 16:32:17');
INSERT INTO `role_permissions` VALUES (389, 2, 55, '2021-01-26 18:19:16', '2021-01-26 18:19:16');
INSERT INTO `role_permissions` VALUES (390, 2, 80, '2021-01-26 18:19:16', '2021-01-26 18:19:16');
INSERT INTO `role_permissions` VALUES (391, 1, 112, '2021-01-28 16:39:58', '2021-01-28 16:39:58');
INSERT INTO `role_permissions` VALUES (392, 1, 113, '2021-01-28 16:39:58', '2021-01-28 16:39:58');
INSERT INTO `role_permissions` VALUES (395, 1, 116, '2021-01-28 16:39:58', '2021-01-28 16:39:58');
INSERT INTO `role_permissions` VALUES (396, 1, 117, '2021-02-14 01:12:40', '2021-02-14 01:12:40');
INSERT INTO `role_permissions` VALUES (397, 1, 118, '2021-02-14 01:12:40', '2021-02-14 01:12:40');
INSERT INTO `role_permissions` VALUES (398, 1, 119, '2021-02-14 01:12:40', '2021-02-14 01:12:40');
INSERT INTO `role_permissions` VALUES (399, 1, 120, '2021-02-14 01:12:40', '2021-02-14 01:12:40');
INSERT INTO `role_permissions` VALUES (400, 1, 121, '2021-02-14 01:12:40', '2021-02-14 01:12:40');
INSERT INTO `role_permissions` VALUES (401, 1, 122, '2021-02-14 01:52:56', '2021-02-14 01:52:56');
INSERT INTO `role_permissions` VALUES (402, 1, 123, '2021-02-14 01:52:56', '2021-02-14 01:52:56');
INSERT INTO `role_permissions` VALUES (403, 1, 124, '2021-02-14 01:52:56', '2021-02-14 01:52:56');
INSERT INTO `role_permissions` VALUES (404, 1, 125, '2021-02-14 01:52:56', '2021-02-14 01:52:56');
INSERT INTO `role_permissions` VALUES (405, 1, 126, '2021-02-14 01:52:56', '2021-02-14 01:52:56');
INSERT INTO `role_permissions` VALUES (406, 1, 127, '2021-02-14 01:58:11', '2021-02-14 01:58:11');
INSERT INTO `role_permissions` VALUES (407, 1, 128, '2021-02-14 01:58:11', '2021-02-14 01:58:11');
INSERT INTO `role_permissions` VALUES (408, 1, 129, '2021-02-14 01:58:11', '2021-02-14 01:58:11');
INSERT INTO `role_permissions` VALUES (409, 1, 130, '2021-02-14 01:58:11', '2021-02-14 01:58:11');
INSERT INTO `role_permissions` VALUES (410, 1, 131, '2021-02-14 01:58:11', '2021-02-14 01:58:11');
INSERT INTO `role_permissions` VALUES (411, 1, 132, '2021-02-14 02:20:14', '2021-02-14 02:20:14');
INSERT INTO `role_permissions` VALUES (412, 1, 133, '2021-02-14 02:20:14', '2021-02-14 02:20:14');
INSERT INTO `role_permissions` VALUES (413, 1, 134, '2021-02-14 02:20:14', '2021-02-14 02:20:14');
INSERT INTO `role_permissions` VALUES (414, 1, 135, '2021-02-14 02:20:14', '2021-02-14 02:20:14');
INSERT INTO `role_permissions` VALUES (415, 1, 136, '2021-02-14 02:20:14', '2021-02-14 02:20:14');
INSERT INTO `role_permissions` VALUES (416, 1, 137, '2021-02-15 02:14:03', '2021-02-15 02:14:03');
INSERT INTO `role_permissions` VALUES (417, 1, 138, '2021-02-18 17:11:37', '2021-02-18 17:11:37');
INSERT INTO `role_permissions` VALUES (418, 1, 139, '2021-02-18 17:11:37', '2021-02-18 17:11:37');
INSERT INTO `role_permissions` VALUES (419, 1, 140, '2021-02-18 17:11:37', '2021-02-18 17:11:37');
INSERT INTO `role_permissions` VALUES (420, 1, 141, '2021-02-18 17:11:37', '2021-02-18 17:11:37');
INSERT INTO `role_permissions` VALUES (421, 1, 142, '2021-02-18 17:11:37', '2021-02-18 17:11:37');
INSERT INTO `role_permissions` VALUES (422, 1, 143, '2021-02-18 17:29:32', '2021-02-18 17:29:32');
INSERT INTO `role_permissions` VALUES (423, 1, 144, '2021-02-18 17:29:32', '2021-02-18 17:29:32');
INSERT INTO `role_permissions` VALUES (424, 1, 145, '2021-02-18 17:29:32', '2021-02-18 17:29:32');
INSERT INTO `role_permissions` VALUES (425, 1, 146, '2021-02-18 17:29:32', '2021-02-18 17:29:32');
INSERT INTO `role_permissions` VALUES (426, 1, 147, '2021-02-18 17:29:32', '2021-02-18 17:29:32');
INSERT INTO `role_permissions` VALUES (427, 1, 148, '2021-02-18 22:58:03', '2021-02-18 22:58:03');
INSERT INTO `role_permissions` VALUES (428, 1, 150, '2021-02-22 17:47:49', '2021-02-22 17:47:49');
INSERT INTO `role_permissions` VALUES (429, 1, 151, '2021-02-23 17:12:48', '2021-02-23 17:12:48');
INSERT INTO `role_permissions` VALUES (430, 1, 152, '2021-02-23 17:12:48', '2021-02-23 17:12:48');
INSERT INTO `role_permissions` VALUES (431, 1, 153, '2021-02-23 17:12:48', '2021-02-23 17:12:48');
INSERT INTO `role_permissions` VALUES (432, 1, 154, '2021-02-23 17:12:48', '2021-02-23 17:12:48');
INSERT INTO `role_permissions` VALUES (433, 1, 155, '2021-03-01 18:34:39', '2021-03-01 18:34:39');
INSERT INTO `role_permissions` VALUES (434, 1, 156, '2021-03-01 18:34:39', '2021-03-01 18:34:39');
INSERT INTO `role_permissions` VALUES (435, 1, 157, '2021-03-01 18:34:39', '2021-03-01 18:34:39');
INSERT INTO `role_permissions` VALUES (436, 1, 158, '2021-03-01 18:34:39', '2021-03-01 18:34:39');
INSERT INTO `role_permissions` VALUES (437, 1, 159, '2021-03-02 15:57:06', '2021-03-02 15:57:06');
INSERT INTO `role_permissions` VALUES (438, 1, 160, '2021-03-02 15:57:06', '2021-03-02 15:57:06');
INSERT INTO `role_permissions` VALUES (439, 1, 161, '2021-03-02 15:57:06', '2021-03-02 15:57:06');
INSERT INTO `role_permissions` VALUES (440, 1, 162, '2021-03-02 15:57:06', '2021-03-02 15:57:06');
INSERT INTO `role_permissions` VALUES (441, 1, 163, '2021-03-02 15:57:06', '2021-03-02 15:57:06');
INSERT INTO `role_permissions` VALUES (442, 1, 164, '2021-03-02 16:50:09', '2021-03-02 16:50:09');
INSERT INTO `role_permissions` VALUES (443, 1, 165, '2021-03-12 17:16:22', '2021-03-12 17:16:22');
INSERT INTO `role_permissions` VALUES (444, 1, 166, '2021-03-12 17:16:22', '2021-03-12 17:16:22');
INSERT INTO `role_permissions` VALUES (445, 1, 167, '2021-03-12 17:16:22', '2021-03-12 17:16:22');
INSERT INTO `role_permissions` VALUES (446, 1, 168, '2021-03-12 17:16:22', '2021-03-12 17:16:22');
INSERT INTO `role_permissions` VALUES (447, 1, 169, '2021-03-12 17:16:22', '2021-03-12 17:16:22');
INSERT INTO `role_permissions` VALUES (449, 1, 172, '2021-03-24 17:59:18', '2021-03-24 17:59:18');
INSERT INTO `role_permissions` VALUES (451, 1, 114, '2021-04-13 21:51:50', '2021-04-13 21:51:50');
INSERT INTO `role_permissions` VALUES (452, 1, 115, '2021-04-13 21:51:50', '2021-04-13 21:51:50');
INSERT INTO `role_permissions` VALUES (453, 1, 171, '2021-04-13 21:51:50', '2021-04-13 21:51:50');
INSERT INTO `role_permissions` VALUES (454, 1, 29, '2021-04-14 16:28:15', '2021-04-14 16:28:15');
INSERT INTO `role_permissions` VALUES (455, 1, 170, '2021-04-14 16:28:15', '2021-04-14 16:28:15');
INSERT INTO `role_permissions` VALUES (456, 2, 169, '2021-04-16 19:17:59', '2021-04-16 19:17:59');
INSERT INTO `role_permissions` VALUES (457, 2, 88, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (458, 2, 111, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (459, 2, 170, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (460, 2, 54, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (461, 2, 82, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (462, 2, 83, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (463, 2, 84, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (464, 2, 85, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (465, 2, 86, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (466, 2, 87, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (467, 2, 90, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (468, 2, 91, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (469, 2, 92, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (470, 2, 93, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (471, 2, 94, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (472, 2, 95, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (473, 2, 96, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (474, 2, 97, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (475, 2, 98, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (476, 2, 99, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (477, 2, 100, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (478, 2, 101, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (479, 2, 102, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (480, 2, 103, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (481, 2, 104, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (482, 2, 105, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (483, 2, 106, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (484, 2, 107, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (485, 2, 108, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (486, 2, 109, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (487, 2, 110, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (488, 2, 112, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (489, 2, 113, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (490, 2, 114, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (491, 2, 115, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (492, 2, 116, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (493, 2, 172, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (494, 2, 117, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (495, 2, 118, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (496, 2, 119, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (497, 2, 120, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (498, 2, 121, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (499, 2, 122, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (500, 2, 123, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (501, 2, 124, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (502, 2, 125, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (503, 2, 126, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (504, 2, 127, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (505, 2, 128, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (506, 2, 129, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (507, 2, 130, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (508, 2, 131, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (509, 2, 132, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (510, 2, 133, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (511, 2, 134, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (512, 2, 135, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (513, 2, 136, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (514, 2, 137, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (515, 2, 171, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (516, 2, 138, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (517, 2, 139, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (518, 2, 140, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (519, 2, 141, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (520, 2, 142, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (521, 2, 143, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (522, 2, 144, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (523, 2, 145, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (524, 2, 146, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (525, 2, 147, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (526, 2, 148, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (527, 2, 150, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (528, 2, 151, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (529, 2, 152, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (530, 2, 153, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (531, 2, 154, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (532, 2, 155, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (533, 2, 156, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (534, 2, 157, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (535, 2, 158, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (536, 2, 159, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (537, 2, 160, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (538, 2, 161, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (539, 2, 162, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (540, 2, 163, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (541, 2, 164, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (542, 2, 165, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (543, 2, 166, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (544, 2, 167, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (545, 2, 168, '2021-04-16 19:20:26', '2021-04-16 19:20:26');
INSERT INTO `role_permissions` VALUES (546, 1, 173, '2021-04-22 16:09:49', '2021-04-22 16:09:49');
INSERT INTO `role_permissions` VALUES (547, 1, 174, '2021-04-22 16:09:49', '2021-04-22 16:09:49');
INSERT INTO `role_permissions` VALUES (548, 1, 175, '2021-04-22 16:09:49', '2021-04-22 16:09:49');
INSERT INTO `role_permissions` VALUES (549, 1, 176, '2021-04-22 16:09:49', '2021-04-22 16:09:49');
INSERT INTO `role_permissions` VALUES (550, 1, 177, '2021-04-22 16:09:49', '2021-04-22 16:09:49');
INSERT INTO `role_permissions` VALUES (551, 1, 178, '2021-04-22 17:27:51', '2021-04-22 17:27:51');
INSERT INTO `role_permissions` VALUES (552, 2, 173, '2021-04-22 20:06:41', '2021-04-22 20:06:41');
INSERT INTO `role_permissions` VALUES (553, 2, 174, '2021-04-22 20:06:41', '2021-04-22 20:06:41');
INSERT INTO `role_permissions` VALUES (554, 2, 175, '2021-04-22 20:06:41', '2021-04-22 20:06:41');
INSERT INTO `role_permissions` VALUES (555, 2, 176, '2021-04-22 20:06:41', '2021-04-22 20:06:41');
INSERT INTO `role_permissions` VALUES (556, 2, 177, '2021-04-22 20:06:41', '2021-04-22 20:06:41');
INSERT INTO `role_permissions` VALUES (557, 2, 178, '2021-04-22 20:06:41', '2021-04-22 20:06:41');
INSERT INTO `role_permissions` VALUES (558, 1, 179, '2021-04-22 20:12:47', '2021-04-22 20:12:47');
INSERT INTO `role_permissions` VALUES (559, 2, 179, '2021-04-22 20:12:52', '2021-04-22 20:12:52');
INSERT INTO `role_permissions` VALUES (560, 1, 180, '2021-04-30 18:12:19', '2021-04-30 18:12:19');
INSERT INTO `role_permissions` VALUES (561, 1, 181, '2021-04-30 18:12:19', '2021-04-30 18:12:19');
INSERT INTO `role_permissions` VALUES (562, 1, 182, '2021-04-30 18:12:19', '2021-04-30 18:12:19');
INSERT INTO `role_permissions` VALUES (563, 1, 183, '2021-04-30 18:12:19', '2021-04-30 18:12:19');
INSERT INTO `role_permissions` VALUES (564, 1, 184, '2021-04-30 18:12:19', '2021-04-30 18:12:19');
INSERT INTO `role_permissions` VALUES (565, 2, 180, '2021-05-06 17:49:14', '2021-05-06 17:49:14');
INSERT INTO `role_permissions` VALUES (566, 2, 181, '2021-05-06 17:49:14', '2021-05-06 17:49:14');
INSERT INTO `role_permissions` VALUES (567, 2, 182, '2021-05-06 17:49:14', '2021-05-06 17:49:14');
INSERT INTO `role_permissions` VALUES (568, 2, 183, '2021-05-06 17:49:14', '2021-05-06 17:49:14');
INSERT INTO `role_permissions` VALUES (569, 2, 184, '2021-05-06 17:49:14', '2021-05-06 17:49:14');
INSERT INTO `role_permissions` VALUES (570, 1, 185, '2021-05-10 20:10:38', '2021-05-10 20:10:38');
INSERT INTO `role_permissions` VALUES (571, 2, 185, '2021-05-10 20:10:44', '2021-05-10 20:10:44');
INSERT INTO `role_permissions` VALUES (572, 1, 186, '2021-05-12 17:43:57', '2021-05-12 17:43:57');
INSERT INTO `role_permissions` VALUES (573, 2, 186, '2021-05-12 17:44:01', '2021-05-12 17:44:01');
INSERT INTO `role_permissions` VALUES (576, 1, 188, '2021-05-13 16:56:35', '2021-05-13 16:56:35');
INSERT INTO `role_permissions` VALUES (577, 2, 188, '2021-05-13 16:56:41', '2021-05-13 16:56:41');
INSERT INTO `role_permissions` VALUES (578, 1, 189, '2021-05-18 16:05:18', '2021-05-18 16:05:18');
INSERT INTO `role_permissions` VALUES (579, 2, 189, '2021-05-18 16:05:21', '2021-05-18 16:05:21');
INSERT INTO `role_permissions` VALUES (580, 2, 22, '2021-09-06 23:30:53', '2021-09-06 23:30:53');
INSERT INTO `role_permissions` VALUES (581, 17, 23, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (582, 17, 48, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (583, 17, 111, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (584, 17, 170, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (585, 17, 49, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (586, 17, 50, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (587, 17, 51, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (588, 17, 52, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (589, 17, 53, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (590, 17, 54, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (591, 17, 82, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (592, 17, 91, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (593, 17, 92, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (594, 17, 93, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (595, 17, 94, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (596, 17, 95, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (597, 17, 96, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (598, 17, 97, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (599, 17, 98, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (600, 17, 99, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (601, 17, 100, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (602, 17, 101, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (603, 17, 102, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (604, 17, 103, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (605, 17, 104, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (606, 17, 105, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (607, 17, 185, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (608, 17, 106, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (609, 17, 107, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (610, 17, 108, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (611, 17, 109, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (612, 17, 110, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (613, 17, 186, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (614, 17, 112, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (615, 17, 113, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (616, 17, 114, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (617, 17, 115, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (618, 17, 116, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (619, 17, 172, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (620, 17, 117, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (621, 17, 118, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (622, 17, 119, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (623, 17, 120, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (624, 17, 121, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (625, 17, 122, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (626, 17, 123, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (627, 17, 124, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (628, 17, 125, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (629, 17, 126, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (630, 17, 127, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (631, 17, 128, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (632, 17, 129, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (633, 17, 130, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (634, 17, 131, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (635, 17, 132, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (636, 17, 133, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (637, 17, 134, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (638, 17, 135, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (639, 17, 136, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (640, 17, 137, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (641, 17, 171, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (642, 17, 138, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (643, 17, 139, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (644, 17, 140, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (645, 17, 141, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (646, 17, 142, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (647, 17, 143, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (648, 17, 144, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (649, 17, 145, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (650, 17, 146, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (651, 17, 147, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (652, 17, 148, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (653, 17, 150, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (654, 17, 151, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (655, 17, 152, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (656, 17, 153, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (657, 17, 154, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (658, 17, 155, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (659, 17, 156, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (660, 17, 157, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (661, 17, 158, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (662, 17, 159, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (663, 17, 160, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (664, 17, 161, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (665, 17, 162, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (666, 17, 163, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (667, 17, 164, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (668, 17, 165, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (669, 17, 166, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (670, 17, 167, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (671, 17, 168, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (672, 17, 169, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (673, 17, 173, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (674, 17, 174, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (675, 17, 175, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (676, 17, 176, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (677, 17, 177, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (678, 17, 178, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (679, 17, 179, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (680, 17, 188, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (681, 17, 189, '2021-09-09 00:17:05', '2021-09-09 00:17:05');
INSERT INTO `role_permissions` VALUES (683, 17, 83, '2021-09-09 00:21:39', '2021-09-09 00:21:39');
INSERT INTO `role_permissions` VALUES (685, 17, 86, '2021-09-09 00:25:22', '2021-09-09 00:25:22');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为默认角色',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', 0, '2020-07-13 10:23:19', '2021-05-13 14:33:33');
INSERT INTO `roles` VALUES (2, '管理员', 1, '2020-07-14 15:00:00', '2021-05-06 11:28:57');
INSERT INTO `roles` VALUES (17, '普通用户', 0, '2020-07-21 17:23:34', '2020-11-27 19:08:11');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-configuration.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-department.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-invite.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-menu.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-message.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-operation_log.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-permission.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-project_file.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-project_template_task.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-project_template.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-project.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-role_menu.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-role_permission.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-role.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_list.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_log.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_priority.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_state.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_tag.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_task_tag.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_type.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task_working_hour.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-task.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-user_project_collect.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-user_project.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-user_role.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-user_task_like.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-user_task.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-user.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080210-create-verification_code.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080211-create-project_template.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080211-create-role_menu.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080211-create-role_permission.js');
INSERT INTO `sequelizemeta` VALUES ('20200110080212-create-project_template_task.js');
INSERT INTO `sequelizemeta` VALUES ('20200113085949-create-role.js');

-- ----------------------------
-- Table structure for task_lists
-- ----------------------------
DROP TABLE IF EXISTS `task_lists`;
CREATE TABLE `task_lists`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务列表名称',
  `project_id` int(11) UNSIGNED NOT NULL COMMENT '所属项目ID',
  `sort` double(32, 16) UNSIGNED NOT NULL DEFAULT 0.0000000000000000 COMMENT '排序，越大越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  CONSTRAINT `task_lists_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1000030 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_lists
-- ----------------------------
INSERT INTO `task_lists` VALUES (1000010, '调研', 1000059, 65536.0000000000000000, '2021-09-10 02:26:46', '2021-09-10 02:26:46');
INSERT INTO `task_lists` VALUES (1000011, '设计', 1000059, 131072.0000000000000000, '2021-09-10 02:26:46', '2021-09-10 02:26:46');
INSERT INTO `task_lists` VALUES (1000012, '开发', 1000059, 196608.0000000000000000, '2021-09-10 02:26:46', '2021-09-10 02:26:46');
INSERT INTO `task_lists` VALUES (1000013, '测试', 1000059, 262144.0000000000000000, '2021-09-10 02:26:46', '2021-09-10 02:26:46');
INSERT INTO `task_lists` VALUES (1000014, '部署', 1000059, 327680.0000000000000000, '2021-09-10 02:26:46', '2021-09-10 02:26:46');
INSERT INTO `task_lists` VALUES (1000015, '调研', 1000060, 65536.0000000000000000, '2021-09-10 02:29:24', '2021-09-10 02:29:24');
INSERT INTO `task_lists` VALUES (1000016, '设计', 1000060, 131072.0000000000000000, '2021-09-10 02:29:24', '2021-09-10 02:29:24');
INSERT INTO `task_lists` VALUES (1000017, '开发', 1000060, 196608.0000000000000000, '2021-09-10 02:29:24', '2021-09-10 02:29:24');
INSERT INTO `task_lists` VALUES (1000018, '测试', 1000060, 262144.0000000000000000, '2021-09-10 02:29:24', '2021-09-10 02:29:24');
INSERT INTO `task_lists` VALUES (1000019, '部署', 1000060, 327680.0000000000000000, '2021-09-10 02:29:24', '2021-09-10 02:29:24');
INSERT INTO `task_lists` VALUES (1000025, '简单了解', 1000064, 65536.0000000000000000, '2021-09-13 01:37:50', '2021-09-13 01:44:57');
INSERT INTO `task_lists` VALUES (1000026, '快速入门', 1000064, 131072.0000000000000000, '2021-09-13 01:37:50', '2021-09-13 01:45:05');
INSERT INTO `task_lists` VALUES (1000027, '开始协作', 1000064, 196608.0000000000000000, '2021-09-13 01:37:50', '2021-09-13 01:45:43');
INSERT INTO `task_lists` VALUES (1000028, '更多帮助', 1000064, 262144.0000000000000000, '2021-09-13 01:37:50', '2021-09-13 01:47:21');

-- ----------------------------
-- Table structure for task_logs
-- ----------------------------
DROP TABLE IF EXISTS `task_logs`;
CREATE TABLE `task_logs`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '日志说明',
  `task_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '任务ID',
  `project_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '项目ID',
  `operator_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '操作人ID',
  `icon` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '图标',
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '日志内容',
  `is_comment` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为评论.1为true,0为false',
  `type` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '类型',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `task_id`(`task_id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  INDEX `operator_id`(`operator_id`) USING BTREE,
  CONSTRAINT `task_logs_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_logs_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_logs_ibfk_3` FOREIGN KEY (`operator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1702 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_logs
-- ----------------------------
INSERT INTO `task_logs` VALUES (1647, '创建了任务', 1000098, 1000059, 2, 'el-icon-plus', 'id为1的任务', 0, 'create', '2021-09-10 02:28:56', '2021-09-10 02:28:56');
INSERT INTO `task_logs` VALUES (1648, '完成了任务', 1000098, 1000059, 2, 'el-icon-check', '', 0, 'is_done', '2021-09-10 02:29:01', '2021-09-10 02:29:01');
INSERT INTO `task_logs` VALUES (1649, '重做了任务', 1000098, 1000059, 1, 'el-icon-check', '', 0, 'is_done', '2021-09-10 02:29:03', '2021-09-10 02:29:03');
INSERT INTO `task_logs` VALUES (1650, '创建了任务', 1000099, 1000060, 2, 'el-icon-plus', 'id为1的任务', 0, 'create', '2021-09-10 02:30:05', '2021-09-10 02:30:05');
INSERT INTO `task_logs` VALUES (1651, '完成了任务', 1000099, 1000060, 1, 'el-icon-check', '', 0, 'is_done', '2021-09-10 02:30:32', '2021-09-10 02:30:32');
INSERT INTO `task_logs` VALUES (1652, '完成了任务', 1000098, 1000059, 2, 'el-icon-check', '', 0, 'is_done', '2021-09-10 02:31:45', '2021-09-10 02:31:45');
INSERT INTO `task_logs` VALUES (1653, '创建了任务', 1000100, 1000060, 1, 'el-icon-plus', 'id为2的任务', 0, 'create', '2021-09-10 02:33:08', '2021-09-10 02:33:08');
INSERT INTO `task_logs` VALUES (1654, '创建了任务', 1000101, 1000059, 2, 'el-icon-plus', 'root的私有任务', 0, 'create', '2021-09-10 02:34:17', '2021-09-10 02:34:17');
INSERT INTO `task_logs` VALUES (1667, '更新了内容', 1000098, 1000059, 2, 'el-icon-edit', '完成的任务', 0, 'name', '2021-09-13 01:33:24', '2021-09-13 01:33:24');
INSERT INTO `task_logs` VALUES (1668, '创建了任务', 1000104, 1000064, 1, 'el-icon-plus', '什么是任务「执行者」？', 0, 'create', '2021-09-13 01:38:10', '2021-09-13 01:38:10');
INSERT INTO `task_logs` VALUES (1669, '更新了备注', 1000104, 1000064, 1, 'el-icon-document', '<p><strong>「执行者」：</strong>任务的<strong>负责人。</strong></p><p><strong><br/></strong></p><p>每个任务对应<strong>唯一</strong>执行者。</p><p><br/></p><p>点击任务卡片<strong>左上角的头像按钮</strong>，可以将这条任务安排给指定的对象。</p>', 0, 'remark', '2021-09-13 01:38:18', '2021-09-13 01:38:18');
INSERT INTO `task_logs` VALUES (1670, '指派给了 root', 1000104, 1000064, 1, 'el-icon-user', NULL, 0, 'executor_assign', '2021-09-13 01:38:48', '2021-09-13 01:38:48');
INSERT INTO `task_logs` VALUES (1671, '创建了任务', 1000105, 1000064, 1, 'el-icon-plus', '什么是任务「参与者」？', 0, 'create', '2021-09-13 01:43:05', '2021-09-13 01:43:05');
INSERT INTO `task_logs` VALUES (1672, '更新了备注', 1000105, 1000064, 1, 'el-icon-document', '<p><strong>「参与者」</strong>：需要关注任务进展的人。</p><p><br/></p><p><strong>所有任务参与者都将收到此任务的评论和更新通知。</strong><br/></p><p><br/></p><p>点击参与者的<strong>＋号</strong>，添加任何你认为需要关注此条任务进展的人。</p>', 0, 'remark', '2021-09-13 01:43:15', '2021-09-13 01:43:15');
INSERT INTO `task_logs` VALUES (1673, '创建了任务', 1000106, 1000064, 1, 'el-icon-plus', '红色：非常紧急的任务', 0, 'create', '2021-09-13 01:43:23', '2021-09-13 01:43:23');
INSERT INTO `task_logs` VALUES (1674, '修改任务优先级为 非常紧急', 1000106, 1000064, 1, 'el-icon-edit', NULL, 0, 'priority', '2021-09-13 01:43:26', '2021-09-13 01:43:26');
INSERT INTO `task_logs` VALUES (1675, '创建了任务', 1000107, 1000064, 1, 'el-icon-plus', '橙色：较紧急的任务', 0, 'create', '2021-09-13 01:43:35', '2021-09-13 01:43:35');
INSERT INTO `task_logs` VALUES (1676, '修改任务优先级为 紧急', 1000107, 1000064, 1, 'el-icon-edit', NULL, 0, 'priority', '2021-09-13 01:43:38', '2021-09-13 01:43:38');
INSERT INTO `task_logs` VALUES (1677, '创建了任务', 1000108, 1000064, 1, 'el-icon-plus', '这条任务已经逾期了', 0, 'create', '2021-09-13 01:43:46', '2021-09-13 01:43:46');
INSERT INTO `task_logs` VALUES (1678, '更新截止时间为 2021-09-12 18:00:00', 1000108, 1000064, 1, 'el-icon-date', NULL, 0, 'end_date', '2021-09-13 01:43:53', '2021-09-13 01:43:53');
INSERT INTO `task_logs` VALUES (1679, '更新截止时间为 2020-09-13 18:00:00', 1000108, 1000064, 1, 'el-icon-date', NULL, 0, 'end_date', '2021-09-13 01:44:06', '2021-09-13 01:44:06');
INSERT INTO `task_logs` VALUES (1680, '更新截止时间为 2021-07-13 18:00:00', 1000108, 1000064, 1, 'el-icon-date', NULL, 0, 'end_date', '2021-09-13 01:44:24', '2021-09-13 01:44:24');
INSERT INTO `task_logs` VALUES (1681, '创建了任务', 1000109, 1000064, 1, 'el-icon-plus', '这是一条已完成的任务', 0, 'create', '2021-09-13 01:44:32', '2021-09-13 01:44:32');
INSERT INTO `task_logs` VALUES (1682, '完成了任务', 1000109, 1000064, 1, 'el-icon-check', '', 0, 'is_done', '2021-09-13 01:44:34', '2021-09-13 01:44:34');
INSERT INTO `task_logs` VALUES (1683, '创建了任务', 1000110, 1000064, 1, 'el-icon-plus', '你收到了一条新任务，点击查看任务详情', 0, 'create', '2021-09-13 01:45:11', '2021-09-13 01:45:11');
INSERT INTO `task_logs` VALUES (1684, '创建了任务', 1000111, 1000064, 1, 'el-icon-plus', '↓点击下方+按钮，添加任务', 0, 'create', '2021-09-13 01:45:18', '2021-09-13 01:45:18');
INSERT INTO `task_logs` VALUES (1685, '创建了任务', 1000112, 1000064, 1, 'el-icon-plus', '→ 点按拖动该任务至右边的项目阶段', 0, 'create', '2021-09-13 01:45:23', '2021-09-13 01:45:23');
INSERT INTO `task_logs` VALUES (1686, '创建了任务', 1000113, 1000064, 1, 'el-icon-plus', '√ 点击左侧方框，完成该任务', 0, 'create', '2021-09-13 01:45:29', '2021-09-13 01:45:29');
INSERT INTO `task_logs` VALUES (1687, '创建了任务', 1000114, 1000064, 1, 'el-icon-plus', '因为你不是这个项目的成员，所以你无法做任何的操作，赶快创建一个自己的项目吧！', 0, 'create', '2021-09-13 01:45:35', '2021-09-13 01:45:35');
INSERT INTO `task_logs` VALUES (1688, '创建了任务', 1000115, 1000064, 1, 'el-icon-plus', '① 创建一个「项目」', 0, 'create', '2021-09-13 01:45:49', '2021-09-13 01:45:49');
INSERT INTO `task_logs` VALUES (1689, '更新了备注', 1000115, 1000064, 1, 'el-icon-document', '<p>点击上方的项目管理导航。</p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210901215435_927622617.jpg\"/></p><p>点击创建新项目，创建自己的项目吧！<br/></p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210901215326_120256309.jpg\"/></p>', 0, 'remark', '2021-09-13 01:45:57', '2021-09-13 01:45:57');
INSERT INTO `task_logs` VALUES (1690, '指派给了 root', 1000115, 1000064, 1, 'el-icon-user', NULL, 0, 'executor_assign', '2021-09-13 01:46:45', '2021-09-13 01:46:45');
INSERT INTO `task_logs` VALUES (1691, '创建了任务', 1000116, 1000064, 1, 'el-icon-plus', '② 添加项目成员', 0, 'create', '2021-09-13 01:46:54', '2021-09-13 01:46:54');
INSERT INTO `task_logs` VALUES (1692, '更新了备注', 1000116, 1000064, 1, 'el-icon-document', '<p>点击<img src=\"https://beehives.imfdj.top/public/uploads/20210902133030_106209317.jpg\"/></p><p>如果你是项目拥有者，则可以向列表中用户发起加入项目邀请。<img src=\"https://beehives.imfdj.top/public/uploads/20210902133256_420792576.jpg\"/></p><p>受邀请人，会接收到邀请私信。</p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210902133359_828835296.jpg\"/><br/></p><p>点击私信，则会跳转到邀请信息界面。可查看邀请人，及其邀请项目。点击“立刻加入”，则会跳转到此项目。</p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210902133616_753968413.jpg\"/><br/></p><p>完成。</p>', 0, 'remark', '2021-09-13 01:47:03', '2021-09-13 01:47:03');
INSERT INTO `task_logs` VALUES (1693, '创建了任务', 1000117, 1000064, 1, 'el-icon-plus', '项目创建后，默认为私有项目。可在项目设置中更改为公开项目（所有人都可访问，仅项目成员可编辑）。', 0, 'create', '2021-09-13 01:47:12', '2021-09-13 01:47:12');
INSERT INTO `task_logs` VALUES (1694, '创建了任务', 1000118, 1000064, 1, 'el-icon-plus', '在任务面板中，可添加评论。', 0, 'create', '2021-09-13 01:47:25', '2021-09-13 01:47:25');
INSERT INTO `task_logs` VALUES (1695, '更新了备注', 1000118, 1000064, 1, 'el-icon-document', '<p>输入“@”会自动提示此任务的所有参与者，点选后，会自动填入用户名。点击发布，会向此用户发送站内消息。<img src=\"https://beehives.imfdj.top/public/uploads/20210902232317_018334436.jpg\"/><br/></p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210902232520_151136698.jpg\"/></p>', 0, 'remark', '2021-09-13 01:47:33', '2021-09-13 01:47:33');
INSERT INTO `task_logs` VALUES (1696, '创建了任务', 1000119, 1000064, 1, 'el-icon-plus', '在项目设置中，可以手动输入项目进度百分比。也可以选择“自动更新项目进度”模式，这样项目进度会根据任务的完成程度，自动计算。', 0, 'create', '2021-09-13 01:47:40', '2021-09-13 01:47:40');
INSERT INTO `task_logs` VALUES (1697, '更新了备注', 1000119, 1000064, 1, 'el-icon-document', '<p><img src=\"https://beehives.imfdj.top/public/uploads/20210902233445_826088092.jpg\"/><br/></p>', 0, 'remark', '2021-09-13 01:47:47', '2021-09-13 01:47:47');
INSERT INTO `task_logs` VALUES (1698, '创建了任务', 1000120, 1000064, 1, 'el-icon-plus', '可上传关联文件。', 0, 'create', '2021-09-13 01:48:29', '2021-09-13 01:48:29');
INSERT INTO `task_logs` VALUES (1699, '指派给了 root', 1000118, 1000064, 1, 'el-icon-user', NULL, 0, 'executor_assign', '2021-09-13 01:48:40', '2021-09-13 01:48:40');
INSERT INTO `task_logs` VALUES (1700, '修改执行状态为 修复中', 1000107, 1000064, 1, 'el-icon-pie-chart', NULL, 0, 'state', '2021-09-13 01:49:24', '2021-09-13 01:49:24');
INSERT INTO `task_logs` VALUES (1701, '修改执行状态为 已验收', 1000109, 1000064, 1, 'el-icon-pie-chart', NULL, 0, 'state', '2021-09-13 01:49:29', '2021-09-13 01:49:29');

-- ----------------------------
-- Table structure for task_prioritys
-- ----------------------------
DROP TABLE IF EXISTS `task_prioritys`;
CREATE TABLE `task_prioritys`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '优先级名称',
  `color` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '颜色',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序，越大越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_prioritys
-- ----------------------------
INSERT INTO `task_prioritys` VALUES (2, '普通', '#1B9AEE', 300, '2021-02-14 02:22:05', '2021-02-14 02:22:05');
INSERT INTO `task_prioritys` VALUES (4, '紧急', '#FA8C15', 200, '2021-02-16 21:41:03', '2021-02-16 21:41:06');
INSERT INTO `task_prioritys` VALUES (5, '非常紧急', '#E62412', 100, '2021-02-16 21:41:40', '2021-02-16 21:41:42');

-- ----------------------------
-- Table structure for task_states
-- ----------------------------
DROP TABLE IF EXISTS `task_states`;
CREATE TABLE `task_states`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '状态名称',
  `color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '颜色',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '图标',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序，越大越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_states
-- ----------------------------
INSERT INTO `task_states` VALUES (2, '待办的', '#FE8019', 'iconfont icon-xuanzhong', 600, '2021-02-14 02:22:29', '2021-02-14 02:22:29');
INSERT INTO `task_states` VALUES (3, '已确认', '#FEC429', 'iconfont icon-partial', 500, '2021-02-16 21:36:40', '2021-02-16 21:36:42');
INSERT INTO `task_states` VALUES (4, '修复中', '#4A90E2', 'iconfont icon-bufenchenggong', 400, '2021-02-16 21:36:55', '2021-02-16 21:36:58');
INSERT INTO `task_states` VALUES (5, '已完成', '#9095A7', 'iconfont icon-qiyong', 300, '2021-02-16 21:37:11', '2021-02-16 21:37:14');
INSERT INTO `task_states` VALUES (6, '已验收', '#4BAF50', 'iconfont icon-qiyong', 200, '2021-02-16 21:37:27', '2021-02-16 21:37:29');
INSERT INTO `task_states` VALUES (7, '已取消', '#EC0019', 'iconfont icon-quxiao', 100, '2021-02-16 21:37:40', '2021-02-16 21:37:43');

-- ----------------------------
-- Table structure for task_tags
-- ----------------------------
DROP TABLE IF EXISTS `task_tags`;
CREATE TABLE `task_tags`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标签名称',
  `color` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '颜色',
  `project_id` int(11) UNSIGNED NOT NULL COMMENT '所属项目ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  CONSTRAINT `task_tags_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1000006 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_tags
-- ----------------------------
INSERT INTO `task_tags` VALUES (1000004, '关注', '#1B9AEE', 1000064, '2021-09-13 01:46:12', '2021-09-13 01:46:12');
INSERT INTO `task_tags` VALUES (1000005, '主要问题', '#FA8C15', 1000064, '2021-09-13 01:46:29', '2021-09-13 01:46:29');

-- ----------------------------
-- Table structure for task_task_tags
-- ----------------------------
DROP TABLE IF EXISTS `task_task_tags`;
CREATE TABLE `task_task_tags`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_id` int(11) UNSIGNED NOT NULL COMMENT '任务ID',
  `task_tag_id` int(11) UNSIGNED NOT NULL COMMENT '任务标签ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL COMMENT '所属项目ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `task_id`(`task_id`) USING BTREE,
  INDEX `task_tag_id`(`task_tag_id`) USING BTREE,
  INDEX `task_task_tags_ibfk_3`(`project_id`) USING BTREE,
  CONSTRAINT `task_task_tags_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_task_tags_ibfk_2` FOREIGN KEY (`task_tag_id`) REFERENCES `task_tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_task_tags_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_task_tags
-- ----------------------------
INSERT INTO `task_task_tags` VALUES (121, 1000115, 1000004, '2021-09-13 01:46:32', '2021-09-13 01:46:32', 1000064);
INSERT INTO `task_task_tags` VALUES (122, 1000115, 1000005, '2021-09-13 01:46:33', '2021-09-13 01:46:33', 1000064);

-- ----------------------------
-- Table structure for task_types
-- ----------------------------
DROP TABLE IF EXISTS `task_types`;
CREATE TABLE `task_types`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '类型名称',
  `color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '颜色',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '图标',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序，越大越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_types
-- ----------------------------
INSERT INTO `task_types` VALUES (2, '任务', '#1B9AEE', 'iconfont icon-renwuzuguanli', 300, '2021-02-14 02:22:39', '2021-02-14 02:22:39');
INSERT INTO `task_types` VALUES (3, '需求', '#6A71B8', 'iconfont icon-xuqiu', 200, '2021-02-15 18:09:59', '2021-02-15 18:10:01');
INSERT INTO `task_types` VALUES (4, '缺陷', '#E62412', 'iconfont icon-shandianfahuo', 100, '2021-02-15 18:10:13', '2021-02-15 18:10:15');

-- ----------------------------
-- Table structure for task_working_hours
-- ----------------------------
DROP TABLE IF EXISTS `task_working_hours`;
CREATE TABLE `task_working_hours`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '工作进展',
  `work_time` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '实际工时数',
  `task_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '任务ID',
  `project_id` int(10) UNSIGNED NOT NULL COMMENT '所属项目ID',
  `executor_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '执行者ID',
  `start_date` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_date` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `task_id`(`task_id`) USING BTREE,
  INDEX `executor_id`(`executor_id`) USING BTREE,
  INDEX `task_working_hours_ibfk_3`(`project_id`) USING BTREE,
  CONSTRAINT `task_working_hours_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_working_hours_ibfk_2` FOREIGN KEY (`executor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_working_hours_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_working_hours
-- ----------------------------

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务名称',
  `project_id` int(10) UNSIGNED NOT NULL COMMENT '所属项目ID',
  `parent_id` int(11) NOT NULL DEFAULT 0 COMMENT '父ID',
  `creator_id` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '创建者ID',
  `task_list_id` int(11) UNSIGNED NOT NULL COMMENT '所属任务列表ID',
  `task_state_id` int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '任务状态',
  `task_type_id` int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '任务类型ID',
  `task_priority_id` int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '任务优先级ID',
  `executor_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '执行者ID',
  `start_date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '开始时间',
  `end_date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '结束时间',
  `remark` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '任务备注',
  `is_done` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否完成.1为true,0为false',
  `is_privacy` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为隐私模式.1为true,0为false',
  `is_recycle` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否进入回收站.1为true,0为false',
  `likes` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞数',
  `plan_work_hours` float(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '计划工时',
  `sort` double(32, 16) UNSIGNED NOT NULL DEFAULT 0.0000000000000000 COMMENT '排序，越小越靠前',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `task_list_id`(`task_list_id`) USING BTREE,
  INDEX `task_state_id`(`task_state_id`) USING BTREE,
  INDEX `task_type_id`(`task_type_id`) USING BTREE,
  INDEX `task_priority_id`(`task_priority_id`) USING BTREE,
  INDEX `tasks_ibfk_5`(`project_id`) USING BTREE,
  INDEX `tasks_ibfk_6`(`creator_id`) USING BTREE,
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`task_list_id`) REFERENCES `task_lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`task_state_id`) REFERENCES `task_states` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`task_type_id`) REFERENCES `task_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tasks_ibfk_4` FOREIGN KEY (`task_priority_id`) REFERENCES `task_prioritys` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tasks_ibfk_5` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tasks_ibfk_6` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1000121 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO `tasks` VALUES (1000098, '完成的任务', 1000059, 0, 2, 1000010, 2, 2, 2, 0, '', '', '', 1, 0, 0, 0, 0.00, 119156.3636363636300000, '2021-09-10 02:28:56', '2021-09-13 01:33:24');
INSERT INTO `tasks` VALUES (1000099, 'id为1的任务', 1000060, 0, 2, 1000015, 2, 2, 2, 0, '', '', '', 1, 0, 0, 0, 0.00, 65536.0000000000000000, '2021-09-10 02:30:05', '2021-09-10 02:30:32');
INSERT INTO `tasks` VALUES (1000100, 'id为2的任务', 1000060, 0, 1, 1000015, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 131072.0000000000000000, '2021-09-10 02:33:08', '2021-09-10 02:33:08');
INSERT INTO `tasks` VALUES (1000101, 'root的私有任务', 1000059, 0, 2, 1000010, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 131072.0000000000000000, '2021-09-10 02:34:17', '2021-09-10 02:34:17');
INSERT INTO `tasks` VALUES (1000104, '什么是任务「执行者」？', 1000064, 0, 1, 1000025, 2, 2, 2, 2, '', '', '<p><strong>「执行者」：</strong>任务的<strong>负责人。</strong></p><p><strong><br/></strong></p><p>每个任务对应<strong>唯一</strong>执行者。</p><p><br/></p><p>点击任务卡片<strong>左上角的头像按钮</strong>，可以将这条任务安排给指定的对象。</p>', 0, 0, 0, 0, 0.00, 65536.0000000000000000, '2021-09-13 01:38:10', '2021-09-13 01:38:48');
INSERT INTO `tasks` VALUES (1000105, '什么是任务「参与者」？', 1000064, 0, 1, 1000025, 2, 2, 2, 0, '', '', '<p><strong>「参与者」</strong>：需要关注任务进展的人。</p><p><br/></p><p><strong>所有任务参与者都将收到此任务的评论和更新通知。</strong><br/></p><p><br/></p><p>点击参与者的<strong>＋号</strong>，添加任何你认为需要关注此条任务进展的人。</p>', 0, 0, 0, 0, 0.00, 131072.0000000000000000, '2021-09-13 01:43:05', '2021-09-13 01:43:15');
INSERT INTO `tasks` VALUES (1000106, '红色：非常紧急的任务', 1000064, 0, 1, 1000025, 2, 2, 5, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 196608.0000000000000000, '2021-09-13 01:43:23', '2021-09-13 01:43:27');
INSERT INTO `tasks` VALUES (1000107, '橙色：较紧急的任务', 1000064, 0, 1, 1000025, 4, 2, 4, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 262144.0000000000000000, '2021-09-13 01:43:35', '2021-09-13 01:49:24');
INSERT INTO `tasks` VALUES (1000108, '这条任务已经逾期了', 1000064, 0, 1, 1000025, 2, 2, 2, 0, '', '2021-07-13 18:00:00', NULL, 0, 0, 0, 0, 0.00, 327680.0000000000000000, '2021-09-13 01:43:46', '2021-09-13 01:44:24');
INSERT INTO `tasks` VALUES (1000109, '这是一条已完成的任务', 1000064, 0, 1, 1000025, 6, 2, 2, 0, '', '', '', 1, 0, 0, 0, 0.00, 393216.0000000000000000, '2021-09-13 01:44:32', '2021-09-13 01:49:29');
INSERT INTO `tasks` VALUES (1000110, '你收到了一条新任务，点击查看任务详情', 1000064, 0, 1, 1000026, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 65536.0000000000000000, '2021-09-13 01:45:11', '2021-09-13 01:45:11');
INSERT INTO `tasks` VALUES (1000111, '↓点击下方+按钮，添加任务', 1000064, 0, 1, 1000026, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 131072.0000000000000000, '2021-09-13 01:45:18', '2021-09-13 01:45:18');
INSERT INTO `tasks` VALUES (1000112, '→ 点按拖动该任务至右边的项目阶段', 1000064, 0, 1, 1000026, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 196608.0000000000000000, '2021-09-13 01:45:23', '2021-09-13 01:45:23');
INSERT INTO `tasks` VALUES (1000113, '√ 点击左侧方框，完成该任务', 1000064, 0, 1, 1000026, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 262144.0000000000000000, '2021-09-13 01:45:29', '2021-09-13 01:45:29');
INSERT INTO `tasks` VALUES (1000114, '因为你不是这个项目的成员，所以你无法做任何的操作，赶快创建一个自己的项目吧！', 1000064, 0, 1, 1000026, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 327680.0000000000000000, '2021-09-13 01:45:35', '2021-09-13 01:45:35');
INSERT INTO `tasks` VALUES (1000115, '① 创建一个「项目」', 1000064, 0, 1, 1000027, 2, 2, 2, 2, '', '', '<p>点击上方的项目管理导航。</p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210901215435_927622617.jpg\"/></p><p>点击创建新项目，创建自己的项目吧！<br/></p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210901215326_120256309.jpg\"/></p>', 0, 0, 0, 0, 0.00, 65536.0000000000000000, '2021-09-13 01:45:49', '2021-09-13 01:46:45');
INSERT INTO `tasks` VALUES (1000116, '② 添加项目成员', 1000064, 0, 1, 1000027, 2, 2, 2, 0, '', '', '<p>点击<img src=\"https://beehives.imfdj.top/public/uploads/20210902133030_106209317.jpg\"/></p><p>如果你是项目拥有者，则可以向列表中用户发起加入项目邀请。<img src=\"https://beehives.imfdj.top/public/uploads/20210902133256_420792576.jpg\"/></p><p>受邀请人，会接收到邀请私信。</p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210902133359_828835296.jpg\"/><br/></p><p>点击私信，则会跳转到邀请信息界面。可查看邀请人，及其邀请项目。点击“立刻加入”，则会跳转到此项目。</p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210902133616_753968413.jpg\"/><br/></p><p>完成。</p>', 0, 0, 0, 0, 0.00, 131072.0000000000000000, '2021-09-13 01:46:54', '2021-09-13 01:47:03');
INSERT INTO `tasks` VALUES (1000117, '项目创建后，默认为私有项目。可在项目设置中更改为公开项目（所有人都可访问，仅项目成员可编辑）。', 1000064, 0, 1, 1000027, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 196608.0000000000000000, '2021-09-13 01:47:12', '2021-09-13 01:47:12');
INSERT INTO `tasks` VALUES (1000118, '在任务面板中，可添加评论。', 1000064, 0, 1, 1000028, 2, 2, 2, 2, '', '', '<p>输入“@”会自动提示此任务的所有参与者，点选后，会自动填入用户名。点击发布，会向此用户发送站内消息。<img src=\"https://beehives.imfdj.top/public/uploads/20210902232317_018334436.jpg\"/><br/></p><p><img src=\"https://beehives.imfdj.top/public/uploads/20210902232520_151136698.jpg\"/></p>', 0, 0, 0, 0, 0.00, 65536.0000000000000000, '2021-09-13 01:47:25', '2021-09-13 01:48:40');
INSERT INTO `tasks` VALUES (1000119, '在项目设置中，可以手动输入项目进度百分比。也可以选择“自动更新项目进度”模式，这样项目进度会根据任务的完成程度，自动计算。', 1000064, 0, 1, 1000028, 2, 2, 2, 0, '', '', '<p><img src=\"https://beehives.imfdj.top/public/uploads/20210902233445_826088092.jpg\"/><br/></p>', 0, 0, 0, 0, 0.00, 131072.0000000000000000, '2021-09-13 01:47:40', '2021-09-13 01:47:47');
INSERT INTO `tasks` VALUES (1000120, '可上传关联文件。', 1000064, 0, 1, 1000028, 2, 2, 2, 0, '', '', NULL, 0, 0, 0, 0, 0.00, 196608.0000000000000000, '2021-09-13 01:48:29', '2021-09-13 01:48:29');

-- ----------------------------
-- Table structure for user_project_collects
-- ----------------------------
DROP TABLE IF EXISTS `user_project_collects`;
CREATE TABLE `user_project_collects`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `project_id` int(11) UNSIGNED NOT NULL COMMENT '项目ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  CONSTRAINT `user_project_collects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_project_collects_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_project_collects
-- ----------------------------

-- ----------------------------
-- Table structure for user_projects
-- ----------------------------
DROP TABLE IF EXISTS `user_projects`;
CREATE TABLE `user_projects`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `project_id` int(11) UNSIGNED NOT NULL COMMENT '项目ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  CONSTRAINT `user_projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_projects_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 111 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_projects
-- ----------------------------
INSERT INTO `user_projects` VALUES (103, 2, 1000059, '2021-09-10 02:26:46', '2021-09-10 02:26:46');
INSERT INTO `user_projects` VALUES (104, 1, 1000059, '2021-09-10 02:28:18', '2021-09-10 02:28:20');
INSERT INTO `user_projects` VALUES (105, 1, 1000060, '2021-09-10 02:29:24', '2021-09-10 02:29:24');
INSERT INTO `user_projects` VALUES (106, 2, 1000060, '2021-09-10 02:29:42', '2021-09-10 02:29:42');
INSERT INTO `user_projects` VALUES (109, 1, 1000064, '2021-09-13 01:37:50', '2021-09-13 01:37:50');
INSERT INTO `user_projects` VALUES (110, 2, 1000064, '2021-09-13 01:38:34', '2021-09-13 01:38:34');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `role_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 182 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (122, 1, 1, '2020-09-22 17:47:21', '2020-09-22 17:47:21');
INSERT INTO `user_roles` VALUES (180, 2, 17, '2021-09-09 00:14:54', '2021-09-09 00:14:54');

-- ----------------------------
-- Table structure for user_task_likes
-- ----------------------------
DROP TABLE IF EXISTS `user_task_likes`;
CREATE TABLE `user_task_likes`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `task_id` int(11) UNSIGNED NOT NULL COMMENT '任务ID',
  `project_id` int(11) UNSIGNED NOT NULL COMMENT '项目ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_task_like_unique`(`user_id`, `task_id`) USING BTREE,
  INDEX `task_id`(`task_id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  CONSTRAINT `user_task_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_task_likes_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_task_likes_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_task_likes
-- ----------------------------
INSERT INTO `user_task_likes` VALUES (32, 1, 1000119, 1000064, '2021-09-13 01:48:44', '2021-09-13 01:48:44');

-- ----------------------------
-- Table structure for user_tasks
-- ----------------------------
DROP TABLE IF EXISTS `user_tasks`;
CREATE TABLE `user_tasks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL COMMENT '用户ID',
  `task_id` int(11) UNSIGNED NOT NULL COMMENT '任务ID',
  `project_id` int(10) UNSIGNED NOT NULL COMMENT '所属项目ID',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `actions_unique`(`user_id`, `task_id`) USING BTREE,
  INDEX `task_id`(`task_id`) USING BTREE,
  INDEX `user_tasks_ibfk_3`(`project_id`) USING BTREE,
  CONSTRAINT `user_tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_tasks_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_tasks_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 358 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_tasks
-- ----------------------------
INSERT INTO `user_tasks` VALUES (330, 2, 1000098, 1000059, '2021-09-10 02:28:56', '2021-09-10 02:28:56');
INSERT INTO `user_tasks` VALUES (331, 2, 1000099, 1000060, '2021-09-10 02:30:05', '2021-09-10 02:30:05');
INSERT INTO `user_tasks` VALUES (332, 1, 1000100, 1000060, '2021-09-10 02:33:08', '2021-09-10 02:33:08');
INSERT INTO `user_tasks` VALUES (333, 2, 1000101, 1000059, '2021-09-10 02:34:17', '2021-09-10 02:34:17');
INSERT INTO `user_tasks` VALUES (338, 1, 1000104, 1000064, '2021-09-13 01:38:10', '2021-09-13 01:38:10');
INSERT INTO `user_tasks` VALUES (339, 2, 1000104, 1000064, '2021-09-13 01:38:48', '2021-09-13 01:38:48');
INSERT INTO `user_tasks` VALUES (340, 1, 1000105, 1000064, '2021-09-13 01:43:05', '2021-09-13 01:43:05');
INSERT INTO `user_tasks` VALUES (341, 1, 1000106, 1000064, '2021-09-13 01:43:23', '2021-09-13 01:43:23');
INSERT INTO `user_tasks` VALUES (342, 1, 1000107, 1000064, '2021-09-13 01:43:35', '2021-09-13 01:43:35');
INSERT INTO `user_tasks` VALUES (343, 1, 1000108, 1000064, '2021-09-13 01:43:46', '2021-09-13 01:43:46');
INSERT INTO `user_tasks` VALUES (344, 1, 1000109, 1000064, '2021-09-13 01:44:32', '2021-09-13 01:44:32');
INSERT INTO `user_tasks` VALUES (345, 1, 1000110, 1000064, '2021-09-13 01:45:11', '2021-09-13 01:45:11');
INSERT INTO `user_tasks` VALUES (346, 1, 1000111, 1000064, '2021-09-13 01:45:18', '2021-09-13 01:45:18');
INSERT INTO `user_tasks` VALUES (347, 1, 1000112, 1000064, '2021-09-13 01:45:23', '2021-09-13 01:45:23');
INSERT INTO `user_tasks` VALUES (348, 1, 1000113, 1000064, '2021-09-13 01:45:29', '2021-09-13 01:45:29');
INSERT INTO `user_tasks` VALUES (349, 1, 1000114, 1000064, '2021-09-13 01:45:35', '2021-09-13 01:45:35');
INSERT INTO `user_tasks` VALUES (350, 1, 1000115, 1000064, '2021-09-13 01:45:49', '2021-09-13 01:45:49');
INSERT INTO `user_tasks` VALUES (351, 2, 1000115, 1000064, '2021-09-13 01:46:45', '2021-09-13 01:46:45');
INSERT INTO `user_tasks` VALUES (352, 1, 1000116, 1000064, '2021-09-13 01:46:54', '2021-09-13 01:46:54');
INSERT INTO `user_tasks` VALUES (353, 1, 1000117, 1000064, '2021-09-13 01:47:12', '2021-09-13 01:47:12');
INSERT INTO `user_tasks` VALUES (354, 1, 1000118, 1000064, '2021-09-13 01:47:26', '2021-09-13 01:47:26');
INSERT INTO `user_tasks` VALUES (355, 1, 1000119, 1000064, '2021-09-13 01:47:40', '2021-09-13 01:47:40');
INSERT INTO `user_tasks` VALUES (356, 1, 1000120, 1000064, '2021-09-13 01:48:29', '2021-09-13 01:48:29');
INSERT INTO `user_tasks` VALUES (357, 2, 1000118, 1000064, '2021-09-13 01:48:40', '2021-09-13 01:48:40');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id_github` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'github用户ID',
  `department_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '部门id',
  `username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态：0.停用、1.正常',
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像url',
  `company` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '国家',
  `city` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '城市',
  `last_login` datetime(0) NULL DEFAULT NULL COMMENT '最后登录时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  INDEX `user_department_ibfk_1`(`department_id`) USING BTREE,
  CONSTRAINT `user_department_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 0, 20, 'admin', '管理员', '1fe4627be80e227bda423d89103609b1a721ea417334b50b0ee00f59d7d17f85', '11@qq.com', 1, '18686868686', 'https://qiniucdn.imfdj.top/avatar.jpg', '', '', '2021-09-13 01:34:35', NULL, '2020-07-13 10:23:03', '2021-09-13 01:34:35');
INSERT INTO `users` VALUES (2, 0, 20, 'root', '', 'e0a403c7dae19faa153f5d0673a5c1f2e4da584108a968922e7603d106eb8211', '9077@qq.com', 1, ' ', 'https://qiniucdn.imfdj.top/avatar.jpg', '', '', '2021-09-13 01:26:30', NULL, '2020-07-21 15:54:59', '2021-09-13 01:26:30');

-- ----------------------------
-- Table structure for verification_codes
-- ----------------------------
DROP TABLE IF EXISTS `verification_codes`;
CREATE TABLE `verification_codes`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '验证码',
  `target` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '验证码接受者',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '类型.1为邮箱验证码,2为手机验证码',
  `available` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用.1为true,0为false',
  `expiration_time` datetime(0) NOT NULL COMMENT '过期时间',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of verification_codes
-- ----------------------------
INSERT INTO `verification_codes` VALUES (1, '0000', '333@qq.com', 1, 1, '2020-08-08 21:00:01', '2020-08-05 21:23:00', '2020-08-05 21:23:00');
INSERT INTO `verification_codes` VALUES (2, '0000', '907765782@qq.com', 1, 0, '2020-08-08 21:00:01', '2020-08-05 21:29:13', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (3, '0000', '907765782@qq.com', 1, 0, '2020-08-08 21:00:01', '2020-08-05 21:30:34', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (4, '0000', '907765782@qq.com', 1, 0, '2020-12-12 12:00:01', '2020-08-05 21:51:12', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (5, '0000', '907765782@qq.com', 1, 0, '2020-12-12 12:00:01', '2020-08-05 21:51:53', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (6, '0000', '907765782@qq.com', 1, 0, '2020-12-12 12:00:01', '2020-08-05 21:54:52', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (7, '808756', '907765782@qq.com', 1, 0, '2020-12-12 12:00:01', '2020-08-05 21:56:24', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (8, '896199', '907765782@qq.com', 1, 0, '2020-08-06 07:57:39', '2020-08-06 19:42:40', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (9, '118861', '907765782@qq.com', 1, 0, '2020-08-06 07:50:44', '2020-08-06 19:50:30', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (10, '329045', '907765782@qq.com', 1, 0, '2020-08-06 07:57:12', '2020-08-06 19:56:58', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (11, '028428', '907765782@qq.com', 1, 0, '2020-08-06 07:57:47', '2020-08-06 19:57:32', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (12, '308347', '907765782@qq.com', 1, 0, '2020-08-06 07:58:00', '2020-08-06 19:57:45', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (13, '686603', '907765782@qq.com', 1, 0, '2020-08-06 07:58:27', '2020-08-06 19:58:13', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (14, '541916', '907765782@qq.com', 1, 0, '2020-08-06 09:01:30', '2020-08-06 21:01:16', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (15, '045829', '907765782@qq.com', 1, 0, '2020-08-06 09:04:49', '2020-08-06 21:04:35', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (16, '354161', '907765782@qq.com', 1, 0, '2020-08-06 09:05:53', '2020-08-06 21:05:39', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (17, '515323', '907765782@qq.com', 1, 0, '2020-08-06 09:07:05', '2020-08-06 21:06:51', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (18, '773339', '907765782@qq.com', 1, 0, '2020-08-06 09:10:06', '2020-08-06 21:09:52', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (19, '818110', '907765782@qq.com', 1, 0, '2020-08-06 09:46:13', '2020-08-06 21:31:14', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (20, '915898', '907765782@qq.com', 1, 0, '2020-08-06 09:46:50', '2020-08-06 21:31:51', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (21, '047666', '907765782@qq.com', 1, 0, '2020-08-06 09:48:37', '2020-08-06 21:33:37', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (22, '434999', '907765782@qq.com', 1, 0, '2020-08-06 09:49:54', '2020-08-06 21:34:54', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (23, '860264', '907765782@qq.com', 1, 0, '2020-08-21 10:01:22', '2020-08-06 21:46:23', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (24, '123062', '907765782@qq.com', 1, 0, '2020-08-20 09:05:16', '2020-08-20 20:50:20', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (25, '052992', '907765782@qq.com', 1, 0, '2020-11-03 09:14:08', '2020-08-20 20:59:09', '2021-04-19 21:42:45');
INSERT INTO `verification_codes` VALUES (26, '928546', '907765782@qq.com', 1, 0, '2021-04-19 09:57:23', '2021-04-19 21:42:24', '2021-04-19 21:42:45');

SET FOREIGN_KEY_CHECKS = 1;
