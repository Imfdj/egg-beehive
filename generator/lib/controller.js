'use strict';
const fs = require('fs');
const path = require('path');
const config = require('../config');
let template = fs.readFileSync(path.join(__dirname, '../template/controller/template.js'), 'utf8');

// 如果config.name中带有下划线分割，则改为驼峰
const name_hump = config.name.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
console.log(config.name);
console.log(name_hump);
// 替换对象名
template = template.replace(/_objectName_/gi, config.name);
template = template.replace(/_objectNameHump_/gi, name_hump);
template = template.replace(/__cname__/gi, config.cname);

let fields = '';
// 循环添加字段
config.fields.forEach((v, i) => {
  const item = {
    [v.name]: {
      type: `'${v.type.toLowerCase()}'`,
      required: v.required ? v.required : false,
    },
  };
  // 清除没有设置的属性
  for (const key in item[v.name]) {
    if (item[v.name][key] === undefined) {
      delete item[v.name][key];
    }
  }
  // console.log(JSON.stringify(item, '', 1));
  fields += JSON.stringify(item, '', 1)
    .replace(/^\{\s+/, '')
    .replace(/\s+\}$/, `,${i === config.fields.length - 1 ? '' : '\n'}`)
    .replace(/"/gi, '');
});
template = template.replace(/\$:\s'\{\{fields\}\}',/gi, fields);

// 写文件
fs.writeFileSync(path.join(__dirname, '../../', `/app/controller/v1/${config.name}s.js`), template);
console.log('controller -- success');
