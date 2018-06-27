/**
 * 当我们在可读流上调用stream.pipe()方法将可读流的数据传递到可写流的时候就会在可写流上触发pipe事件
 * 这个事件的事件回调函数接收一个参数，这个参数就是当前可读流。
 */

 const assert = require('assert')
 const fs = require('fs')

 const reader = fs.createReadStream('./finish.txt')
 const writer = fs.createWriteStream('./pipe.txt')

 writer.on('pipe', r => {
     assert.strictEqual(r, reader)
     console.log('pipe 事件发生了')
 })

 reader.pipe(writer)