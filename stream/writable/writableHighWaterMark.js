/**
 * writable.writableHighWaterMark这个方法返回的是创建可写流的时候传递的highWaterMark参数的值
 */
const stream = require('stream')

class MyStream extends stream.Writable {
    constructor(options = {}) {
        super(options)
    }
    _write(chunk, encoding, cb) {
        cb()
    }
}

const w1 = new MyStream()
console.log(`w1's highWaterMark is ${w1.writableHighWaterMark}`)

const w2 = new MyStream({
    highWaterMark: 1000
})
console.log(`w2's highWaterMark is ${w2.writableHighWaterMark}`)