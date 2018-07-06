/**
 * 当新的工作进程被fork的时候，cluster将会触发fork事件。我们可以通过这个事件来记录工作进程的活动。
 */
const cluster = require('cluster')
const timeouts = {}

function error(id) {
    console.error(`worker ${id} error`)
}

if (cluster.isMaster) {
    const worker = cluster.fork()

    cluster.on('fork', worker => {
        timeouts[worker.id] = setTimeout(() => {
            error(worker.id)
        }, 2000)
    })

    cluster.on('listening', worker => {
        clearTimeout(timeouts[worker.id])
    })

    cluster.on('exit', worker => {
        clearTimeout(timeouts[worker.id])
        error(worker.id)
    })
}