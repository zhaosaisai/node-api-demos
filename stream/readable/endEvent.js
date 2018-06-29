/**
 * end事件将在流中再没有数据可供消费的时候触发
 * end事件只有在数据被完全消费的时候触发，可以在数据被完全消费后，通过将流转换到flowing模式，或者调用
 * stream.read()来实现这一点
 */
const fs = require('fs')
const readable = fs.createReadStream('../index.js')

readable.on('end', () => {
    console.log('流被完全消费了')
})

// 触发end事件的第一种方式
// readable.resume()

// 触发end实践的第二种方式
// readable.on('data', chunk => {})

// 触发end事件的第三种方式
readable.pipe(fs.createWriteStream('./end.ss'))

// 上面三种模式都是将流变为flowing状态