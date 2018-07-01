/**
 * readable.readableHighWaterMark
 * 这个属性用于返回创建可读流时候传递的highWaterMark的值
 */
const { Readable } = require('stream')
const assert = require('assert')

const r1 = new Readable({
    highWaterMark: 0
})

assert.strictEqual(r1.readableHighWaterMark, 0)

const r2 = new Readable({
    highWaterMark: 100
})

assert.strictEqual(r2.readableHighWaterMark, 100)
