/**
 * 在工作进程的IPC管道被断开后会触发这个事件。
 * 可能导致事件触发的原因包括：工作进程优雅的退出，被kill或者手动的断开连接
 */

const cluster = require('cluster')
const cpus = require('os').cpus()

if (cluster.isMaster) {
   //  主进程
   for (let i = 0; i < cpus.length; i++) {
       const worker = cluster.fork()

       worker.on('disconnect', () => {
           console.log(`工作进程${worker.process.pid}断开`)
       })
   }
   cluster.on('disconnect', worker => {
       console.log(`主进程接收到工作进程${worker.process.pid}断开`)
   })
} else {
   //  工作进程
   console.log(`正在启动工作进程${process.pid}`)
   setTimeout(() => {
       cluster.worker.disconnect()
   }, 1000)
}