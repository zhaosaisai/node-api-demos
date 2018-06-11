/**
 * 这个事件会在被监视的文件发生错误的时候触发
 */
const fs = require('fs')
const path = require('path')

const watcher = fs.watch({}, () => {})

watcher.on('error', () => {
    console.log('监视文件出错')
    watcher.close()
})
