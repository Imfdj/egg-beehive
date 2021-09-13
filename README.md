<p align="center"><a href="https://beehive.imfdj.top" target="_blank" rel="noopener noreferrer"><img width="100" src="https://qiniucdn.imfdj.top/vue-beehive/logo.png" alt="Beehive logo"></a></p>

<p align="center"><a href="https://choosealicense.com/licenses/mit/"><img alt="License MIT" src="https://img.shields.io/badge/licence-MIT-blue.svg?style=flat-square"></a><img alt="Current version" src="https://img.shields.io/badge/build-passing-brightgreen"><img alt="Current version" src="https://img.shields.io/badge/version-1.0.0-brightgreen"></p>

<h2 align="center">Beehive</h2>

## 前言

Beehive 是一个项目管理系统。参考于Teambetion、PearProject，实现部分功能。

这是一个Vue+Node.js的js全栈项目。基于RBAC模型做权限控制，动态配置菜单，前端实现页面元素级别的权限控制。通过WebSocket实现站内信功能，任务看板中，实现更新同步推送。一旦其他项目成员有对我们当前查看的项目任务做任何的操作，页面都将立即同步更新，并向此任务的所有参与者（除了操作者）发送消息通知。注册和找回密码需要通过邮箱验证码验证，可以通过github授权登陆（不是很稳定）。

Node.js框架选用的是Egg.js，配合sequelize，自己写了一个小工具。可以通过填写表字段的配置，执行npm run generator-entity自动生成一整套文件，包括Swagger、数据校验validate、Sequelize需要的model、controller、service、router。并自动创建数据库表，包括每个字段的类型、长度、是否能为空、默认值、注释、索引、甚至是外键都能搞定。因为加了权限控制，所以还要到前端的资源管理中添加一下新增的资源，并在角色中点选分配一下，就完成了一张表的CRUD了，包括新增、修改、详情、批量删除、分页列表。当然这还是有很多可以优化的空间的，但也基本够用了。为了优化鉴权消耗，以及满足WebSocket的可靠性设计需要，系统引入Redis做缓存。

密码是加盐存储的，且在传输过程中使用了RSA做了非对称加密。Jwt认证使用Access Token + Refresh Token，配合黑名单。


## 效果演示

预发布环境：超级管理员账号：test-super ，密码：test-super123 <a href="https://beehives.imfdj.top" target="_blank">预发布环境地址：beehives.imfdj.top</a>

预发布环境：普通用户账号：test-user ，密码：test-user123

生产环境：普通用户账号：test-user ，密码：test-user123 <a href="https://beehive.imfdj.top" target="_blank">生产环境地址：beehive.imfdj.top</a>


## 技术栈

前端：Vue2全家桶 + Element-ui + Axios + Vue-socket.io + Sass <a href="https://github.com/Imfdj/vue-beehive" target="_blank">前端项目github地址</a>

后端：Egg.js + Sequelize + Jwt + Mysql + Redis + Socket + Swagger <a href="https://github.com/Imfdj/egg-beehive" target="_blank">后端项目github地址</a>


## 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目。如：Vue3 + NestJS + TypeScript ✨

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍



## 目标功能
- [x] 登录、注册 -- 完成
- [x] github授权登录 -- 完成
- [x] 找回密码 -- 完成
- [x] 滑块验证 -- 完成
- [x] 邮箱验证 -- 完成
- [x] 动态首页 -- 完成
- [x] 个人设置 -- 完成

- [x] 用户管理 -- 完成
- [x] 角色管理 -- 完成
- [x] 菜单管理 -- 完成
- [x] 资源管理 -- 完成
- [x] 操作日志 -- 完成
- [x] 动态菜单 -- 完成
- [x] 部门管理 -- 完成

- [x] 项目列表 -- 完成
- [x] 任务看板 -- 完成
- [x] 任务列表 -- 完成
- [x] 项目文件 -- 完成
- [x] 项目概览 -- 完成
- [x] 项目成员 -- 完成
- [x] 项目邀请 -- 完成
- [x] 项目设置 -- 完成
- [x] 项目回收站 -- 完成
- [x] 任务筛选 -- 完成
- [x] 任务详情 -- 完成
- [x] 任务标签 -- 完成
- [x] 任务参与者 -- 完成
- [x] 任务动态 -- 完成
- [x] 任务工时 -- 完成
- [x] 任务关联文件 -- 完成
- [x] 任务更新即时同步 -- 完成
- [x] 公开项目的业务权限控制（非项目成员不可编辑项目） -- 完成

- [x] 项目模板 -- 完成
- [x] 消息提醒 -- 完成

- [x] 工作台 -- 完成
- [x] 站内信 -- 完成
- [x] 页面元素权限控制 -- 完成

- [ ] 项目版本 -- 待开发
- [ ] 项目日程 -- 待开发




## 部分截图




<img src="https://qiniucdn.imfdj.top/beehive/production/home-page.gif" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_115100.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_115127.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_112646.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_113236.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_113312.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_113341.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-13_021734.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_113612.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_114307.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_115228.png" style="margin-bottom: 5px"/>

<img src="https://qiniucdn.imfdj.top/beehive/production/2021-09-12_113839.png" style="margin-bottom: 5px"/>







## 后端egg项目部署

#### 运行环境：

Node.js >= v10; Mysql >= 5.7; Redis >= 5.0; 

```
git clone https://github.com/Imfdj/egg-beehive.git

cd egg-beehive

npm install 或 yarn(推荐)

将database目录下的egg-beehive-dev.sql和egg-beehive-test.sql导入mysql（推荐navicat）。

在config目录下的config.local.js和config.unittest.js中的exports.sequelize、exports.redis、exports.io.redis下填入Mysql和Redis的配置参数

npm run dev

npm run test-local (单元测试)

```

#### 如何快速CRUD：

```
在generator文件夹中的config.js文件中定义各个字段的描述，完成后执行npm run generator-entity。
里面还有很多config-*.js的配置文件可供参考。也可以在template文件夹中自定义各个文件的模板。

// 这是一个字段的描述模板
fieldsItemExample: {
    name: 'xx_id',
    type: 'INTEGER',
    length: 11,
    min: 1,
    max: 1,
    required: true,
    description: '这里是描述', // 供swagger使用
    primaryKey: false, // 是否为主键
    unique: false, // 是否唯一
    allowNull: false, // 是否允许为空
    autoIncrement: false, // 是否自增
    defaultValue: '', // 数据库表中字段的默认值
    comment: '外键', // 数据库表中字段的描述
    references: {
      // 外键设置
      model: 'xxxs', // 外键关联表
      key: 'id', // 外键字段名
    },
    onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
}

```


## 前端vue项目部署

```
git clone https://github.com/Imfdj/vue-beehive.git

cd vue-beehive

npm install 或 yarn(推荐)

npm run serve

```


## 功能设计

<img src="https://qiniucdn.imfdj.top/beehive/production/Beehive%E5%8A%9F%E8%83%BD%E8%AE%BE%E8%AE%A1.jpg"/>

## 后端设计

<img src="https://qiniucdn.imfdj.top/beehive/production/Beehive%E5%90%8E%E7%AB%AF%E8%AE%BE%E8%AE%A1.jpg"/>

## 数据库设计

<img src="https://qiniucdn.imfdj.top/beehive/production/Beehive-data-model.jpg"/>


### License

[MIT](https://github.com/Imfdj/egg-beehive/blob/master/LICENSE)

Copyright (c) 2021 Imfdj

