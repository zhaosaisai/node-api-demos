/**
 * readable.pause()方法主要用于暂停一个可读流
 * 这个方法会使flowing模式下的流转为paused，并且停止触发data事件。将数据缓冲在内存中
 */
const fs = require('fs')

const r = fs.createReadStream('./end.ss')

r.on('end', () => {
    console.log('文件读取完毕')
})

r.on('data', chunk => {
    r.pause()
    console.log('r mode is ', r.isPaused())
    console.log(chunk.toString())
    process.nextTick(() => {
        r.resume()
        console.log('r mode is ', r.isPaused())
    })
})
