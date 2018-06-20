/**
 * 如果在事件循环的一次轮询中，一个Promise被rejected了，并且这个promise没有绑定错误处理程序
 * 就会触发unhandledRejection事件
 * 
 * 这个事件的回调函数接收两个参数
 *  reason：被拒绝的原因
 *  p：被rejected的promise
 */
const assert = require('assert')

const promise = new Promise((resolve, reject) => {
    reject(new Error('rejection event'))
})

process.on('unhandledRejection', (reason, p) => {
    assert.ok(reason instanceof Error)
    assert.strictEqual(reason.message, 'rejection event')
    assert.strictEqual(p, promise)
    console.log('捕获了rejection')
})