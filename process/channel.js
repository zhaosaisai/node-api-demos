/**
 * process.channel
 * 如果nodejs的进程是通过IPC channel创建的，process.channel保存的是对这个IPC channel的引用
 * 如果IPC channel不存在，则这个值是undefined
 */
 
//  TODO: 具体的用法还不知
 const fork = require('child_process').fork

 if (process.argv[2] === 'child') {
     console.log(process.channel)
 } else {
     const child = fork(__filename, ['child'])
     console.log(child.channel)
 }