/**
 * 子进程结束之后就会触发exit事件，这个事件的回调函数接收两个参数。
 *  code：如果子进程退出自身，则这个值就是进程退出时候的退出码
 *  signal：子进程被终止时候的信号
 * 
 * 注意，当这个事件被触发的时候，子进程的stdio流可能依然是打开的
 */
const assert = require('assert')
const spawn = require('child_process').spawn

const child = spawn(process.execPath, ['./index.js'])

child.on('exit', (code, signal) => {
    assert.strictEqual(code, 0)
    assert.strictEqual(signal, null)
})