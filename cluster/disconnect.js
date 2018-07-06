/**
 * cluster.disconnect([callback])
 * 这个方法会断开主进程和各个工作进程之间的连接。接收一个回调函数作为参数，当所有的连接断开后
 * 会调用这个回调函数。这个方法会触发cluster和各个工作进程的disconnect事件。
 */
const cluster = require('cluster')
const cpus = require('os').cpus()

if (cluster.isMaster) {
    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork()

        worker.on('disconnect', () => {
            console.log(`worker ${worker.id} disconnected`)
        })
    }
    // 这个事件会在每个工作进程断开的时候触发
    cluster.on('disconnect', () => {
        console.log('cluster disconnected')
    })

    setTimeout(() => {
        cluster.disconnect(() => {
            console.log('主动断开了cluster')
        })
    }, 2000)
}