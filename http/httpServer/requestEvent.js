const http = require('http')
const assert = require('assert')

const server = new http.Server()

server.on('request', (req, res) => {
    assert.ok('name' in req.headers)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end('Hello world\r\n')
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port,
        headers: {
            'name': 'Node Server'
        }
    })

    req.on('response', (res) => {
        assert.strictEqual(res.statusCode, 200)
        let data = ''
        
        res.on('data', (chunk) => {
            data += chunk.toString()
        })
        
        res.on('end', () => {
            console.log(data)
            assert.strictEqual(data, 'Hello world\r\n')
            server.close()
        })
    })
})