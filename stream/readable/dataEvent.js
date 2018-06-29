/**
 * 当流处于可读取的状态的时候会触发这个事件，这个事件的回调函数接收一个参数，表示读取的数据。
 * 这个事件也会将readableFlowing的值设置为true
 */
const fs = require('fs')
const assert = require('assert')

const readable = fs.createReadStream('../index.js')

readable.on('data', chunk => {
    console.log(chunk.toString())
})
