/**
 * 当watcher被关闭的时候触发
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, 'watched-directory')
fs.mkdirSync(root)

const watcher = fs.watch(root, { persistent: false, recursive: false })

// The following listeners may or may not be invoked.
watcher.on('error', () => {
    console.log('watcher errored')
    setTimeout(() => {
        watcher.close()
    }, 10);
})

watcher.on('change', () => {
    console.log('watcher changed')
    setTimeout(() => {
        watcher.close()
    }, 10)
})

watcher.on('close', () => {
    console.log('stop watch file')
})

// 删除文件
fs.rmdirSync(root)

setTimeout(() => {}, 100)