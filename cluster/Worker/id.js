/**
 * 每一个新衍生的工作进程都会赋予一个独一无二的id。当工作进程还活着的时候，
 * id可以作为cluster.workers中的索引
 */
const cluster = require('cluster')
const assert = require('assert')
const cpus = require('os').cpus()

if (cluster.isMaster) {
    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork()
        console.log(`新创建的worker的id是${worker.id}`)
    }
}