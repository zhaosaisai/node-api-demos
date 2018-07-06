/**
 * 当cluster主进程接收到任意的工作进程发送过来的信息会触发cluster上的message事件
 * Node 6.0以上会接收message和handler作为回调函数的参数
 * Node 6.0以下会接收worker作为第一个参数，后面两个是上述的参数
 */
const cluster = require('cluster')
const assert = require('assert')
const MESSAGE = 'the worker message'

if (cluster.isMaster) {
    const worker = cluster.fork()
    
    cluster.on('message', (w, msg) => {
        console.log('接收到工作进程发送来的信息')
        assert.strictEqual(msg, MESSAGE)
        assert.strictEqual(worker, w)
    })
} else {
    setTimeout(() => {
        process.send(MESSAGE)
    }, 2000)
}