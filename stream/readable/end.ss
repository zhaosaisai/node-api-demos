/**
 * 使用流来创建一个简单的http服务器
 */
const http = require('http')

const server = http.createServer((req, res) =>{
    let body = ''

    req.setEncoding('utf8')
    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {
        try {
            const data = JSON.parse(body)

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })

            res.end(body)
        } catch(e) {
            res.statusCode = 400
            res.end(`error: ${e.message}`)
        }
    })
})

server.listen(3000)