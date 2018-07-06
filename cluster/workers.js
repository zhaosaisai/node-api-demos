/**
 * cluster.workers
 * 这个属性是一个hash表，存储了当前活动的工作进程对象。id是对象的key。我们可以在主进程中遍历得到每一个
 * 工作进程。
 */

 const cluster = require('cluster')
 const cpus = require('os').cpus()
 const assert = require('assert')

 if (cluster.isMaster) {
    const workers = []
    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork()
        workers.push(worker)
    }

    process.nextTick(() => {
        for (let i = 0; i < workers.length; i++) {
            assert(cluster.workers[workers[i].id])
        }
        process.exit(0)
    })
 }