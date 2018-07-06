/**
 * 这个方法只能在主进程中调用，用来衍生出一个新的工作进程。
 * 这个方法接收一个对象作为参数，这个参数会被设置为工作进程的环境变量
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork({
        env: 'worker'
    })
} else {
    console.log(process.env)
    assert('env' in process.env)
    assert.strictEqual(process.env.env, 'worker')
}