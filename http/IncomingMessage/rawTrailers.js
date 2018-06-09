/**
 * message.rawTrailers
 * 接收原始尾部请求头或者响应头
 * 
 * 只能在end事件中被获取
 */
const http = require('http')

const server = http.createServer((req, res) => {
    // 必须设置这个字段，否则客户端的 res.rawTrailers 拿不到
    res.setHeader('Trailer', 'x-foo')

    res.addTrailers({
        'x-foo': 'foo',
        'x-bar': 'bar'
    })

    res.end('hello')
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port
    })

    req.on('response', (res) => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log(res.rawTrailers)
        })
    })

    req.end()
})