const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    assert.ok(req instanceof http.IncomingMessage)
    res.end()
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port
    })

    req.on('response', (res) => {
        assert.ok(res instanceof http.IncomingMessage)
    })

    req.end()
})