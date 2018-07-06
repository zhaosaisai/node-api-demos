/**
 * 当当前进程是主进程的时候cluster.isMaster是true
 */

 const cluster = require('cluster')
 const assert = require('assert')

 assert(cluster.isMaster)