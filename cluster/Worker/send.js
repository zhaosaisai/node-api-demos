/**
 * worker.send(message, [sendHandler], [callback])
 * 这个方法主要是用于发送一个信息给工作进程或者主进程。
 */
const http = require('http')
const cluster = require('cluster')
const cpus = require('os').cpus()

function request(port) {
    const r = http.get({
        port: port
    })

    r.on('response', res => {
        res.on('data', chunk => {
            console.log(chunk.toString())
        })
    })
}

// 实现一个在主进程统计工作进程总请求的数据
if (cluster.isMaster) {
    const requests = {}
    let timer = null
    let rs = 0
    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork()
        worker.on('listening', address => {
            if (!timer) {
                console.log('开启请求')
                timer = setInterval(() => {
                    request(address.port)
                    if (rs++ === 10) {
                        clearInterval(timer)
                    }
                }, 500)
            }
        })

        worker.on('message', data => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.id) {
                    if (requests[data.id] === undefined) {
                        requests[data.id] = 0
                    }
                    requests[data.id] += Number(data.action)
                }
                if (requests[data.id] <= 0) {
                    worker.kill()
                }
            } catch(e) {
                console.log(`接收${worker.process.pid}信息失败`)
            }
        })

        worker.on('exit', () => {
            console.log(`${worker.process.pid}退出了，现在的连接状态是${JSON.stringify(
                requests, null, 2
            )}`)
        })
    }
} else {
    const server = http.createServer((req, res) => {
        setTimeout(() => {
            res.end('over', () => {
                process.send(JSON.stringify({
                    id: process.pid,
                    action: -1
                }))
            })
        }, 2000)
    })

    server.on('request', () => {
        console.log('收到请求')
        process.send(JSON.stringify({
            id: process.pid,
            action: 1
        }))
    })

    server.listen(0, () => {
        console.log('Server is listening')
    })
}