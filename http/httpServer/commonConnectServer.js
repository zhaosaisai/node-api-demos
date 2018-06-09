const net = require('net')

net.createServer((c) => {
    console.log('client connected')
    c.on('end', () => {
        console.log('server disconnected')
    })
    c.write('hello\r\n')
    c.end('响应结束\r\n')
}).listen(3001, () => {
    console.log('net running')
})