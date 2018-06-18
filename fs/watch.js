/**
 * fs.watch(path, options, callback)
 * 这个方法主要是用于监视文件的变化
 * path可以指向一个文件也可以指向一个目录
 * 
 * options是监视文件的一些特定的选项：
 *  persistent：表明如果监视的文件正在被监视，那么进程是否应该继续，默认是true
 *  recursive：是否全部的子目录都应该被监视
 *  encoding：指定用于传递给监视器的文件名称的字符编码
 * 
 * 回调函数接收两个参数
 * eventType：表示的是发生变化的类型
 * filename：表示的是发生变化的文件的名称
 * 
 * 这个api在不同的平台上表现差异很大
 */
const fs = require('fs')
const assert = require('assert')
const { join } = require('path')

class WatchCase {
    constructor(dirName, fileName, field) {
        this.dirName = dirName
        this.fileName = fileName
        this.field = field
    }
    get dirPath() {
        return join(__dirname, this.dirName)
    }
    get filePath() {
        return join(this.dirPath, this.fileName)
    }
}

const cases = [
    // 用于监视文件的变化
    new WatchCase(
        'watch1',
        'foo',
        'filePath'
    ),
    // 用于监视目录的变化
    new WatchCase(
        'watch2',
        'bar',
        'dirPath'
    )
]

// 开始监视文件
for (let i = 0; i < cases.length; i++) {
    const cas = cases[i]
    // 创建指定的文件夹
    fs.mkdirSync(cas.dirPath)
    // 向文件中添加一串很长的内容
    const content1 = Date.now() + cas.fileName.toLowerCase().repeat(1e4)
    fs.writeFileSync(cas.filePath, content1)

    let interval
    const pathToWatch = cas[cas.field]
    const watcher = fs.watch(pathToWatch)
    
    console.log(pathToWatch)

    watcher.on('error', (err) => {
        if (interval) {
            clearInterval(interval)
            interval = null
        }
        assert.fail(err)
    })
    
    watcher.on('close', () => {
        // Closing a closed watcher should be a noop
        watcher.close()
         // Starting a closed watcher should be a noop
        watcher.start(pathToWatch)
    })

    watcher.on('change', (eventType, filename) => {
        console.log(filename)
        if (interval) {
            clearInterval(interval)
            interval = null
        }
        // for macox
        assert.strictEqual(['rename', 'change'].includes(eventType), true);
        assert.strictEqual([cas.fileName, undefined].includes(filename), true)

        // Starting a started watcher should be a noop
        watcher.start(pathToWatch)

        watcher.close()

        // watcher.close() // Closing a closed watcher should be a noop
        // watcher.start()  // Starting a closed watcher should be a noop
    })

    const content2 = Date.now() + cas.fileName.toUpperCase().repeat(1e4)
    interval = setInterval(() => {
        fs.writeFileSync(cas.filePath, '')
        fs.writeFileSync(cas.filePath, content2)
    }, 1000)
}