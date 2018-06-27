/**
 * 当我们调用readable.unpipe()方法移除可读流和可写流之间建立的管道的时候就会触发unpipe事件
 * 这个事件的回调函数接收一个参数，就是当前可读流
 */
const fs = require('fs')
const assert = require('assert')

const reader = fs.createReadStream('./finish.txt')
const writer = fs.createWriteStream('./pipe.txt')

writer.on('unpipe', r => {
    console.log('unpipe')
    assert.strictEqual(reader, r)
})

writer.on('pipe', () => {
    console.log('pipe event happened')
    process.nextTick(() => {
        // 必须是当前管道内没有待流传的数据的时候这个方法才会成功
        reader.unpipe()
    })
})

reader.pipe(writer)