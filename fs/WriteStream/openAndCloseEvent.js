/**
 * 当WriteStream文件流被打开的时候会触发open事件
 * 这个事件的回调函数接收一个整数型的文件描述符作为参数
 * 
 * close事件会在WriteStream底层的文件描述符被关闭的时候触发
 */

const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, './README.md')

const writeStream = fs.createWriteStream(file)

writeStream.on('open', (fd) => {
    console.log('File is opened')
    assert.ok(typeof fd === 'number')
    setTimeout(() => {
        // 主动关闭 会触发close事件
        // writeStream.close()
    }, 100)
})

writeStream.on('close', () => {
    console.log('File is closed')
})

// 同样也会触发close事件
writeStream.destroy()