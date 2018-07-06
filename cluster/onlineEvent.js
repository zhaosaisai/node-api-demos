/**
 * 当新建一个工作进程后，工作进程应该向主进程发送一个online消息。
 * 当主进程接收到online消息后会触发online事件。
 * fork事件和online事件不同之处在于：
 *  fork事件会在主进程新建工作进程后触发
 *  online事件会在工作进程运行的时候触发
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork()

    cluster.on('online', () => {
        console.log('收到工作进程的online消息')
    })

    cluster.on('fork', () => {
        console.log('工作进程新建了')
    })
}