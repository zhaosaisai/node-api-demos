/**
 * 当流或者底层资源被关闭的时候就会触发close事件。这个事件表明
 * 不会再触发其它的事件也不会再发生运算。
 * 
 * 不是所有的可写流都会触发close事件
 */

 const http = require('http')

 const server = http.createServer((req, res) => {
    res.on('close', () => {
        console.log('Response closed')
        res.end('hello world')
    })

    res.writeHead(200, {
        'Connection': 'close'
    })
 })

 server.listen(3000, () => {
     const client = http.get({
         port: server.address().port
     })

     client.on('response', res => {
         res.setEncoding('utf8')
         res.on('data', chunk => {
             console.log(chunk)
         })

         res.on('end', () => {
             server.close()
         })
     })
 })