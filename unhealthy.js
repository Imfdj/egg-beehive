'use strict';
const runScript = require('runscript');
const isWin = process.platform === 'win32';
const REGEX = isWin ? /^(.*)\s+(\d+)\s*$/ : /^\s*(\d+)\s+(.*)/;

async function findNodeProcess(filterFn) {
  const command = isWin
    ? 'wmic Path win32_process Where "Name = \'node.exe\'" Get CommandLine,ProcessId'
    : // command, cmd are alias of args, not POSIX standard, so we use args
    'ps -eo "pid,args"';
  const stdio = await runScript(command, { stdio: 'pipe' });
  const processList = stdio.stdout
    .toString()
    .split('\n')
    .reduce((arr, line) => {
      if (!!line && !line.includes('/bin/sh') && line.includes('node')) {
        const m = line.match(REGEX);
        /* istanbul ignore else */
        if (m) {
          const item = isWin ? { pid: m[2], cmd: m[1] } : { pid: m[1], cmd: m[2] };
          if (!filterFn || filterFn(item)) {
            arr.push(item);
          }
        }
      }
      return arr;
    }, []);
  return processList;
}

(async function() {
  const title = process.argv.splice(2)[0].split('--title=')[1];
  const processList = await findNodeProcess(item => {
    const { cmd } = item;
    return cmd.includes('app_worker.js') && cmd.includes(title);
  });
  console.log(`processList.length: ${processList.length}`);
  for (const pro of processList) {
    process.kill(pro.pid, 'SIGINT');
  }
  // 等待nginx移除负载，nginx设置的3秒两次失败移除，额外提供6秒的现有请求处理时间。
  await new Promise(resolve => setTimeout(resolve, 1000 * 12));
})();
