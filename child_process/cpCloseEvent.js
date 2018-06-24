/**
 * 子进程的close事件
 * 当子进程的stdio流被关闭的时候就会触发close事件。这个和exit事件不同，因为多个进程可能会共享
 * 同一stdio流
 * 
 * 这个事件的事件回调接收两个参数
 *  code：如果子进程退出自身，则这个值是进程的退出码
 *  signal：子进程被终止时候的信号
 */

 const assert = require('assert')
 const cp = require('child_process')

 const child = cp.fork('./index.js')

//  如果不绑定这个事件的话，子进程在结束的时候是不会退出的，所以父进程也是不会退出的。
 child.on('close', (code, signal) => {
     console.log('进程退出了')
     assert.strictEqual(code, 0)
     assert.strictEqual(signal, null)
 })