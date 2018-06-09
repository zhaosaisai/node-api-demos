const assert = require('assert')
const http = require('http')

const tests = [417, 417]

let testsComplete = 0
let testIndex = 0

const server = http.createServer(() => {
    throw new Error('this should not be execnted')
})

server.listen(3000, nextTest)

function nextTest() {
    const options = {
        port: server.address().port,
        headers: {
            // 一个错误的值d
            'Expect': '200-continue'
        }
    }

    if (testIndex === tests.length) {
        return server.close()
    }

    const test = tests[testIndex]

    if (testIndex > 0) {
        server.on('checkExpectation', (req, res) => {
            res.statusCode = 417
            res.end()
        })
    }

    http.get(options, (response) => {
        console.log(`client: expected status ${test}`)
        console.log(`client: statusCode ${response.statusCode}`)
        assert.strictEqual(test, response.statusCode)
        assert.strictEqual(response.statusMessage, 'Expectation Failed')

        response.on('end', () => {
            testsComplete++
            testIndex++
            nextTest()
        })
        // 暂时不理解
        response.resume()
    })
}

process.on('exit', () => {
    assert.strictEqual(testsComplete, 2)
})