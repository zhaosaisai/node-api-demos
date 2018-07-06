/**
 * 每当cluster.setupMater被调用的时候触发。
 * 这个事件的回调函数是一个对象，是调用cluster.setupMaster时候的cluster.settings。这个对象
 * 是只读的。
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isWorker) {
    process.send(JSON.stringify(process.argv[2]))
} else if (cluster.isMaster) {
    cluster.on('setup', () => {
        console.log(cluster.settings)
    })
    
    cluster.setupMaster({
        args: ['custom event'],
        silent: true
    })

    const worker = cluster.fork()

    cluster.on('online', worker => {
        worker.once('message', msg => {
            console.log(msg)
            assert.strictEqual(JSON.parse(msg), 'custom event')
        })
    })
}