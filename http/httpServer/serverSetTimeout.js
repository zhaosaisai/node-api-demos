/**
 * server.setTimeout([msess], [callback])
 * 设置socket的超时时间，如果发生了超时，则会触发服务器的timeout事件，并传入socket作为第一个参数
 * 默认时间是120000(2分钟)
 * 默认情况下，如果发生了超时，则socket会自动销毁。
 * 如果我们显示的指定了timeout事件，则必须手动的处理超时
 * 返回值仍然是当前的server对象
 */
const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    setTimeout(() => {
        // 如果没有将 res 的响应放置在一个定时器中 是不会触发
        res.end()
    }, 2000)
})

server.listen(3000, () => {
    // 在指定的时间内没有 res 没有进行响应，就会超时
    const s = server.setTimeout(1000, (socket) => {
        // 手动销毁socket 这个socket是服务端的socket
        // 这个回调函数和timeout事件的回调函数是一样的作用
        socket.destroy()
        server.close()
        console.log('Server Timeout')
    })

    console.log(`s instanceof http.Server：${s instanceof http.Server}`)

    const req = http.get({
        port: server.address().port
    })
    
    req.on('error', (err) => {
        console.log('Client Request Error')
    })

    req.end()
})