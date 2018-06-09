const http = require('http')

const server = new http.Server()

server.on('request', (req, res) => {
    res.end()
})

server.on('close', () => {
    console.log('Server closed')
})

server.listen(3000, () => {
    http.get({
        port: server.address().port
    }, (res) => {
        res.resume()
        res.once('end', () => {
            server.close()
        })
    })
})