/**
 * 当该进程不是主进程的时候，这个值是true
 */
const cluster = require('cluster')

if (cluster.isMaster) {

} else {
    assert(cluster.isWorker)
}