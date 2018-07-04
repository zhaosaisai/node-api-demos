/**
 * exit事件主要是在工作进程退出的时候触发，同时会触发disconnect事件
 */
const cluster = require('cluster')
const http = require('http')

if (cluster.isMaster) {
    const worker = cluster.fork()

    worker.on('exit', code => {
        console.log(`工作进程退出，code值是${code}`)
    })

    worker.on('disconnect', () => {
        console.log(`工作进程${worker.process.pid}连接断开`)
    })

    cluster.on('exit', w => {
        console.log(`主进程退出，code值是${w.process.exitCode}`)
    })

    cluster.on('disconnect', () => {
        console.log(`主进程${process.pid}连接断开`)
    })
} else {
    const server = http.createServer((req, res) => {

    })

    server.listen(0)

    server.on('listening', () => {
        process.exit(1)
        console.log('启动服务器')
    })
}