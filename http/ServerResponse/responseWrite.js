/**
 * response.write(chunk, [encoding], [callback])
 * 返回值是一个布尔值，如果为true，则表示数据被成功的写入到了内核缓冲区，如果为false，表示数据还在
 * 内存中排队，这个时候我们应该监听‘drain’事件，当缓冲区空闲的时候再次写入数据
 * 
 * 这个方法就是用于向响应主体中写入数据。有几个需要注意的地方：
 * HEAD 请求的响应主体会被忽略
 * 204和304也是不能包含响应主体的
 * 
 * 这个方法必须在response.end()方法之前被调用，否则会报错
 */
const http = require('http')
const assert = require('assert')

const server = http.createServer(handle)

function handle(req, res) {
    res.on('error', (err) => {
        assert.strictEqual('write after end', err.message)
        server.close()
    })

    res.write('Hello')
    res.end()

    setImmediate(() => {
        res.write('world')
    })
}

server.listen(3000, () => {
    http.get(`http://localhost:${server.address().port}`, (res) => {
        assert.strictEqual(res.statusCode, 200)
        res.on('data', (chunk) => {
            assert.strictEqual(chunk.toString(), 'Hello')
        })
    }).end()
})