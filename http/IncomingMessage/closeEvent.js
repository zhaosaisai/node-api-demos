/**
 * close事件是底层的连接被关闭的时候触发。
 * 和end事件一样，这个事件每个响应只会触发一次
 * 
 * req 可以通过 req.connection来访问底层的链接
 */
const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    req.on('close', () => {
        console.log('Client Request Closed')
        server.close()
    })

    res.write('Hello World')
 })

 server.listen(3000, () => {
     const req = http.get({
         port: server.address().port,
         headers: {
             'connection': 'keep-alive'
         }
     })

     req.on('response', (res) => {
        res.on('close', () => {
            console.log('Client Response Closed')
        })
        req.connection.destroy()
     })

     req.end()
 })