/**
 * 当任何一个工作进程退出的时候就会触发cluster的exit事件
 * 这个事件的回调函数接收三个参数：
 *  worker：退出的工作进程
 *  code：工作进程的退出码
 *  signal：工作进程的退出信号
 */
const cluster = require('cluster')
const http = require('http')

if (cluster.isMaster) {
    const worker = cluster.fork()

    worker.on('exit', code => {
        console.log(`工作进程退出，code值是${code}`)
    })

    cluster.on('exit', w => {
        console.log(`主进程收到工作进程${w.process.pid}退出，code值是${w.process.exitCode}`)
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