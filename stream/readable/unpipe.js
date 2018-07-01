/**
 * readable.unpipe(destination)
 * destination是一个可选的参数，这个方法的主要作用就是将之前通过pipe方法绑定的流分离。
 * 如果没有传入确定的destination，则所有绑定的流都会被分离。
 * 如果传入了destination，但是没有被pipe过，则什么也不做
 */

const fs = require('fs')
const assert = require('assert')

const reader = fs.createReadStream('./end.ss')
const writer = fs.createWriteStream('./pipe.txt')

writer.on('unpipe', r => {
    console.log('unpipe')
    assert.strictEqual(reader, r)
})

writer.on('pipe', () => {
    console.log('pipe event happened')
    process.nextTick(() => {
        // 必须是当前管道内没有待流传的数据的时候这个方法才会成功
        reader.unpipe(writer)
    })
})

reader.pipe(writer)