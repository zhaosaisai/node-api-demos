/**
 * response.setTimeout(mses, [callback])
 * 设置socket的超时时间，如果设置了callback，就相当于设置了timeout事件监听器
 * 会在超时的时候触发。如果没有这个监听器，则socket会在超时后被销毁。
 * 如果设置了监听器，则我们需要在超时后手动的销毁socket
 * 
 * 如果在mses时间内，服务器没有进行响应就会触发response的timeout事件
 * 如果超时事件发生了，可以销毁socket，然后客户端可以通过监听error事件来获知
 */
const http = require('http')

const server = http.createServer((req, res) => {
    res.setTimeout(100, (socket) => {
        console.log('Response Timeout')
        // 当socket被销毁的时候，客户端会触发error事件
        socket.destroy()
        server.close()
    })
    
    setTimeout(() => {
        // 把响应放在定时器中
        res.end()
    }, 1000)
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port
    }, () => {

    })
    
    req.on('error', (err) => {
        console.log('Request Error')
        console.error(err)
    })

    req.end()
})