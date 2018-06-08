/**
 * res.on('finish')事件会在响应已经被发送的时候触发。更具体的说，当响应头和响应主体的最后一部分被移交给
 * 操作系统的时候触发。但是这不意味着客户端已经收到了数据。
 */

 const http = require('http')

 const server = http.createServer((req, res) => {
    res.on('finish', () => {
        console.log(`${Date.now()} finish事件触发`)
    }) 
    res.end('hello world')
 }) 

 server.listen(3000, () => {
    const req = http.get({
        port: server.address().port
    })

    req.on('response', (res) => {
        let data = ''
        res.on('data', (chunk) => {
            console.log(`${Date.now()} 客户端收到数据`)
            data += chunk.toString()
        })
        res.on('end', () => {
            console.log(`收到的数据是 ${data}`)
        })
    })

    req.end()
 })