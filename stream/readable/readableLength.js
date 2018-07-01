/**
 * readable.readableLength
 * 这个属性返回在缓冲队列中可以被读取的字节数
 */
const { Readable } = require('stream')

// TODO: highWaterMark不起作用
const r = new Readable({
    highWaterMark: 10
})

r.push('hello world')

console.log(r.readableLength)

r.read(1)

console.log(r.readableLength)