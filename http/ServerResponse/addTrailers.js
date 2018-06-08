/**
 * response.addTraliers
 * 这个方法会添加HTTP尾部响应头（在消息尾部的响应头）到响应中。
 * 仅当响应使用分块传输编码的时候，尾部的响应才会被发送。否则这个响应头就会被丢弃。
 * 注意，在发送尾部响应头之前，需要先发送Trailer响应头，并且在value中指明响应尾部头字段的列表
 * 
 * 如果尾部响应头或者字段中包含了无效的字符，那么会抛出TypeError的错误
 */

 const http = require('http')
 const assert = require('assert')
 const util = require('util')
 const net = require('net')

 let outstanding_reqs = 0

 const server = http.createServer((req, res) => {
     res.writeHead(200, {
         'Content-Type': 'text/plain'
     })
     res.addTrailers({'x-foo': 'bar'})
     res.end('stuff\n')
 })

 server.listen(3000)

 //  测试http1.0版本下的addTrailers
 server.on('listening', () => {
    const c = net.createConnection(server.address().port)
    let res_buffer = ''

    c.on('connect', () => {
        outstanding_reqs++
        c.write('GET / HTTP/1.0\r\n\r\n')
    })

    c.on('data', (chunk) => {
        res_buffer += chunk
    })

    c.on('end', () => {
        c.end()
        console.log(`================================`)
        console.log(`Got the data in http1.0\r\n ${res_buffer}`)
        assert.ok(
            !/x-foo/.test(res_buffer),
            `Trailer in HTTP/1.0 response. Response buffer: ${res_buffer}`
        )
        outstanding_reqs--
        if (outstanding_reqs === 0) {
            server.close()
            process.exit()
        }
    })
 })

 //  测试http1.1版本下的addTrailers
 server.on('listening', () => {
    const c = net.createConnection(server.address().port)
    let res_buffer = ''
    let tid

    c.setEncoding('utf8')
    c.on('connect', () => {
        outstanding_reqs++
        c.write('GET / HTTP/1.1\r\n\r\n')
        tid = setTimeout(() => {}, 2000, 'Could not find the last chunk')
    })

    c.on('data', (chunk) => {
        res_buffer += chunk
        if (/0\r\n/.test(res_buffer)) {
            // 收到了尾部的信息
            outstanding_reqs--
            clearTimeout(tid)
            console.log(`================================`)
            console.log(`Got the data in http1.1\r\n ${res_buffer}`)
            assert.ok(
                // 使用正则可以从收到的信息中匹配出对应的尾部header
                /0\r\nx-foo: bar\r\n\r\n$/.test(res_buffer),
                `No trailer in HTTP/1.1 response. Response buffer: ${res_buffer}`                
            )
            if (outstanding_reqs === 0) {
                server.close()
                process.exit()
            }
        }
    })
 })

// 客户端能否看到尾部响应头
server.on('listening', () => {
    const req = http.get({
        port: server.address().port,
        path: '/hello',
        headers: {}
    }, (res) => {
        res.on('end', () => {
            console.log(`================================`)
            console.log(`Client Got the headers\r\n ${JSON.stringify(res.trailers, null, 2)}`)
            assert.ok(
                'x-foo' in res.trailers,
                `${util.inspect(res.trailers)} misses the 'x-foo' property`
            )
            outstanding_reqs--
            if (outstanding_reqs === 0) {
                server.close()
                process.exit()
            }
        })
        res.resume()
    })
    outstanding_reqs++
})