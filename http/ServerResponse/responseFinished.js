/**
 * response.finished表示响应是否完成，在调用 res.end()方法这个属性会变为true
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
     assert.ok(
         !res.finished,
         `Response is finished before res.end`
     )
    res.end('hello world', () => {
        assert.ok(
            res.finished,
            `Response is not finished after the end`
        )
    })
 })

 server.listen(3000, () => {
     http.get({
         port: server.address().port
     }).end()
 })