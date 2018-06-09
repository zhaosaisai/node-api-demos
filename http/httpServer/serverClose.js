const http = require('http')
const assert = require('assert')

const server = new http.createServer()

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end('Hello Client')
})

server.on('close', () => {
    console.log('Server Closed')
})

server.listen(3000, () => {
    http.get({
        port: server.address().port
    }).on('response', (res) =>{
        assert.strictEqual(res.statusCode, 200)
        res.on('end', () => {
            server.close()
        })
        res.resume()
    }).end()
})