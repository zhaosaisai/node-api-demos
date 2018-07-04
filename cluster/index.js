const cluster = require('cluster')
const http = require('http')
const cpus = require('os').cpus()

if (cluster.isMaster) {
    console.log(`主进程${process.pid}正在启动`)

    for (let i = 0; i < cpus.length; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程${worker.pid}已退出`)
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200, {
            'content-type': 'text/html'
        })

        res.end('')
    }).listen(3000)

    console.log(`工作进程${process.pid}已经启动`)
}