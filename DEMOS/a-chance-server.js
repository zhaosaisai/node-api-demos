const Chance = require('chance')
const chance = new Chance()

const server = require('http').createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    while (chance.bool({
        likelihood: 95
    })) {
        res.write(`<h1>${chance.string()}</h1>`)
    }
    res.end('<h3 style="color:red">Chance End</h3>')
    res.on('finish', () => {
        console.log('All data is sent')
        process.nextTick(() => {
            server.close()
        })
    })
})

server.listen(8000, () => {
    console.log('server is listening 8000')
})