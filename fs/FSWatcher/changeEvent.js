/**
 * 当被监视的文件或者目录发生变化的时候会触发这个事件
 * 
 * 这个事件的回调接收两个参数
 * eventType: 发生变化的事件的类型
 * filename：发生变化的文件的名称
 * 
 * filename依据不同的操作系统可能会不存在
 * 如果filename存在的话，如果在调用 fs.watch的时候指定了encoding为buffer的话
 * 那么filename同样会是一个buffer
 * 
 * 这个事件监听器也可以直接作为fs.watch的回调函数进行指定
 */
const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, './testWatchFile.txt')
const watchers = new Set()

function registerWatcher(watcher) {
    watchers.add(watcher)
}

function unregisterWatcher(watcher) {
    watcher.close()
    watchers.delete(watcher)

    if (watchers.size === 0) {
        clearInterval(interval)
    }
}

const watcher1 = fs.watch(
    __dirname,
    { encoding: 'hex' },
    (eventType, filename) => {
        console.log(`watcher1 changes ${eventType}`)
        console.log(`watcher1 changed which filename is ${filename}`)
        unregisterWatcher(watcher1)
    }
)
registerWatcher(watcher1)

const watcher2 = fs.watch(
    __dirname,
    (eventType, filename) => {
        console.log(`watcher2 changes ${eventType}`)
        console.log(`watcher2 changed which filename is ${filename}`)
        unregisterWatcher(watcher2)
    }
)
registerWatcher(watcher2)

const watcher3 = fs.watch(
    __dirname,
    { encoding: 'buffer' },
    (eventType, filename) => {
        console.log(`watcher3 changes ${eventType}`)
        console.log(`watcher3 changed which filename is ${filename.toString('utf8')}`)
        console.log(`watcher3 changed which filename instanceod Buffer ${filename instanceof Buffer}`)
        unregisterWatcher(watcher3)
    }
)
registerWatcher(watcher3)

const interval = setInterval(() => {
    const fd = fs.openSync(file, 'w+')
    fs.closeSync(fd)
    fs.unlinkSync(file)
}, 100)