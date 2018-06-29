/**
 * 当流处于可读取的状态的时候会触发这个事件，这个事件的回调函数接收一个参数，表示读取的数据。
 * 这个事件也会将readableFlowing的值设置为true
 * 
 * 'data' 事件会在流将数据传递给消费者时触发。当流转换到 flowing 模式时会触发该事件。
 * 调用 readable.pipe()， readable.resume() 方法，或为 'data' 事件添加回调可以将流转换到 flowing 模式。 
 * 'data' 事件也会在调用 readable.read() 方法并有数据返回时触发。
 * 
 * 在没有明确暂停的流上添加 'data' 事件监听会将流转换为 flowing 模式。 数据会在可用时尽快传递给下个流程。
 */
const fs = require('fs')
const assert = require('assert')

const readable = fs.createReadStream('../index.js')

readable.on('data', chunk => {
    console.log(chunk.toString())
})
