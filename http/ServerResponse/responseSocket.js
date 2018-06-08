/**
 * response.socket
 * 用来引用底层的socket。
 * response.end()方法调用后，这个属性的值是null
 * 
 * 我们也可以通过response.connection来访问
 * 
 * 我们可以通过这个来获取服务器自己的ip地址和服务的端口号
 * 也可以用来获取客户端的ip地址和端口号
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
    assert.strictEqual(res.socket, res.connection)
    
    console.log(`Client Port ${res.socket.remotePort}`)
    console.log(`Client Ip ${res.socket.remoteAddress}`)
    console.log(`Server Port ${res.socket.localPort}`)
    console.log(`Server Ip ${res.socket.localAddress}`)

    res.end('Hello World', () => {
        assert.strictEqual(res.socket, null)
    })
 })

 server.listen(3000, () => {
     http.get({
         port: server.address().port
     }).end()
 })