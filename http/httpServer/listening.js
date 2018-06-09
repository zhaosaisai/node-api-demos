const http = require('http')

const server = new http.Server()

server.listen(3000, () => {
    console.log(server.listening)
})