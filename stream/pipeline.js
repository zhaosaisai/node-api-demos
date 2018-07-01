/**
 * stream.pipeline(...streams, [callback])
 * 这个方法主要用于在多个流之间架设管道，可以自动传递错误和收尾工作，并且在架设管道完成时候提供一个回调函数
 * ...streams: 两个或者多个要用管道连接的流
 * callback：一个回调函数，带有一个错误信息的参数
 * 
 * 使用pipeline方法可以轻松的连接多个流，并在完成的时候获得通知
 */
const { Readable, Writable, pipeline } = require('stream')
const assert = require('assert')

const expected = [
    Buffer.from('a'),
    Buffer.from('b'),
    Buffer.from('c')
]
const processed = []
let finished = false

const read = new Readable({
    read() {}
})

const write = new Writable({
    write(data, enc, cb) {
        processed.push(data)
        cb()
    }
})

write.on('finish', () => {
    finished = true
})

for(let i = 0; i < expected.length; i++) {
    read.push(expected[i])
}

read.push(null)

pipeline(read, write, (err) => {
    assert(!err, 'has error')
    assert.strictEqual(finished, true)
    assert.deepStrictEqual(expected, processed)
})
