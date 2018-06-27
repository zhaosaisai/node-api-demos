/**
 * 当我们调用stream.end()而且缓冲的数据都已经同步到底层的时候会触发finish事件
 */

 const fs = require('fs')

 const writer = fs.createWriteStream('./finish.txt')

 for (let i = 0; i < 100; i++) {
     writer.write(`这是第${i}个数据\n`)
 }

 writer.end(`这是结尾\n`)

 writer.on('finish', () => {
     console.log('Finish 事件发生')
 })