/**
 * 这个事件会在nodejs的进程退出的时候被触发
 * 一般情况下下面两种情况会触发这个事件
 *  1. 显示的调用process.exit()方法，让nodejs的进程显示结束
 *  2. nodejs进程正常退出，也就是事件循环的数组中不再有任何的操作
 * 
 * 这个事件的回调函数和beforeExit事件的回调函数接收的参数相同，都是表示退出的状态码
 * 
 * 这个事件的事件回调函数只能接收同步操作，异步操作会被忽略，如果想在进程退出前，
 * 执行异步操作，请使用beforeExit事件
 */
const assert = require('assert')

let nextits = 0

process.on('exit', (code) => {
    assert.strictEqual(nextits++, 0)
    assert.strictEqual(code, 0)
    // 不会再次触发exit事件
    process.exit()
})