const http = require('http')
const assert = require('assert')

const test_req_body = 'some stuff..\n'
const test_res_body = 'other stuff!\n'

let sent_continue = false
let got_continue = false

const handler = (req, res) => {
    assert.ok(sent_continue, 'Full response sent before 100 Continue')
    console.log('Server sending full response')
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'ABCD': 1
    })
    res.end(test_res_body)
}

const server = new http.Server()

server.on('checkContinue', (req, res) => {
    console.log('Server got Expect: 100-continue')
    // 这个方法可以触发客户端的continue事件
    res.writeContinue()
    sent_continue = true
    setTimeout(() => {
        handler(req, res)
    }, 100)
})

server.listen(3000, () => {
    const req = http.request({
        port: server.address().port,
        method: 'POST',
        path: '/word',
        headers: {
            'Expect': '100-continue'
        }
    })
    console.log('Client sending request')
    let body = ''
    req.on('continue', () => {
        console.log('Client got 100 continue response')
        got_continue = true
        req.end(test_req_body)
    })

    req.on('response', (res) => {
        assert.ok(got_continue, 'Full response received before 100 Continue')
        assert.strictEqual(200, res.statusCode,
            `Final status code was ${res.statusCode}, not 200.`)
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
            body += chunk
        })
        res.on('end', () => {
            console.log('Got full response')
            assert.strictEqual(body, test_res_body)
            assert.ok('abcd' in res.headers, 'Response headers missing')
            server.close()
            process.exit()
        })
    })
})