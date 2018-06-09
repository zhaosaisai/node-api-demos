/**
 * 设置请求或者响应的超时时间，第二个参数是一个回调函数
 * 相当于timeout事件的事件监听器
 */
/** xxxxxxxxxxxxxxxx */
const http = require('http')

const server = http.createServer((req, res) => {
    const start = Date.now()
    req.connection.on('timeout', () => {
        console.log(`Request time ${Date.now() - start}`)
    })

    req.setTimeout(500, (socket) =>{
        console.log('Client Request Timeout')
        socket.destroy(new Error('timeout'))
    })

    setTimeout(() => {
        res.statusCode = 200
        res.end()
    }, 2000)
})

server.listen(3000, () => {
    console.log('is Listening')
    const req = http.request({
        port: server.address().port,
        // 使用post请求
        method: 'POST'
    })

    req.write('Send some information')

    req.on('error', () => {
        server.close()
    })

    setTimeout(() => {
        req.end('Can you see?')
    }, 1000)
})