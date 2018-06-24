/**
 * subprocess.channel
 * 表示的是子进程的IPC通信的管道
 * 这个属性是对当前子进程的IPC管道的引用，如果当前没有IPC通道，则这个属性的值是undefined
 */

 const assert = require('assert')
 const fork = require('child_process').fork

 if (process.argv[2] === 'child') {
    assert(!!process.channel)
 } else {
     const child = fork(__filename, ['child'])

     assert(!!child.channel)
     assert.strictEqual(process.channel, void 0)

     child.on('exit', () => {
         assert.strictEqual(child.channel, null)
     })
 }