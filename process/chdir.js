/**
 * process.chdir(directory)
 * 用于改变当前nodejs进程的工作目录，如果变更工作目录的时候失败会抛出异常
 */

 const assert = require('assert')

 function printCwd() {
     console.log(process.cwd())
 }

 printCwd()
 process.chdir('..')
 printCwd()
 process.chdir('/usr/bin')
 printCwd()
 process.chdir(__dirname)
 printCwd()