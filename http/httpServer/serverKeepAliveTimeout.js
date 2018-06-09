/**
 * server.keepAliveTimeout是设置服务器完成最后的响应之后，需要额外等待的传入数据的毫秒数，才会去销毁socket。
 * 默认值是5s，这个特性是node8加入的。
 * 
 * 比如，我们使用nodejs实现了一个服务器，如果我们的服务器是运行在node8之前的版本，如果客户端的请求时keep-alive的，服务器
 * 会一直等待客户端的下一个请求直到天荒地老，或者客户端主动关闭了连接。而在node8及之后的版本中运行的时候，只要客户端在
 * keepAliveTimeout时间内没有发起下一个请求，服务器就会主动关闭连接。
 */

const assert = require('assert')
const http = require('http')
const net = require('net')
const tests = []

function test(fn) {
    if (!tests.length) {
        process.nextTick(run)
    }
    tests.push(fn)
}

function run() {
    console.log('start')
    const fn = tests.shift()
    if (fn) fn(run)
}

function done(server, socket, cb) {
    console.log('over')
    socket.destroy()
    server.close(cb)
}

function serverTest(withPipeLine, cb) {
    let gotAll = false
    let timeout = false

    const server = http.createServer((req, res) => {
        console.log(req.url)
        if (withPipeLine) {
            res.end()
        }

        if (req.url === '/3') {
            gotAll = true
            if (timeout) {
                done(server, req.socket, cb)
            }
        }
    })

    server.setTimeout(500, (socket) => {
        console.log('超时了')
        timeout = true
        if (gotAll) {
            done(server, socket, cb)
        }
    })

    server.keepAliveTimeout = 50

    server.listen(3000, () => {
        const options = {
            port: server.address().port,
            allowHalfOpen: true
        }

        const c = net.connect(options, () => {
            c.write('GET /1 HTTP/1.1\r\nHost: localhost\r\n\r\n')
            c.write('GET /2 HTTP/1.1\r\nHost: localhost\r\n\r\n')
            c.write('GET /3 HTTP/1.1\r\nHost: localhost\r\n\r\n')
        })
    })
}

test(function(cb) {
    serverTest(true, cb)
})

test(function(cb) {
    serverTest(false, cb)
})