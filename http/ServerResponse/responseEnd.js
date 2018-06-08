/**
 * response.end([data], [encoding], [callback])
 * 这个方法就是告诉服务器所有的响应头和响应主体已经发送，即服务器将其视为已完成。
 * callback会在数据流结束的时候被调用
 */

const http = require('http')

const server = http.createServer((req, res) => {
    res.end('hello', () => {
        console.log('数据流已经结束')
    })
})

server.listen(3000, () => {
    http.get({
        port: server.address().port
    }).end()
})