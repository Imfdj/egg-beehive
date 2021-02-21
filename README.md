# egg-beehive

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Todo

- [ ] 优先级配置
- [ ] 任务状态
- [ ] 标签配置（多对多）
- [ ] ~~任务类型配置~~
- [ ] 任务-参与者关系表（多对多）
- [ ] 任务工时
- [ ] 任务动态表
- [ ] 任务附件表

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Sequelize

```bash
add dababases table:
    $ sequelize model:generate --name bug --attributes name:string,password:string
migrate dababases table:
    $ sequelize db:migrate
    $ sequelize db:migrate --env test
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### 参考

[egg]: https://eggjs.org
[egg-ts-helper]: https://cnpmjs.org/package/egg-ts-helper
[sequelize]: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOne
