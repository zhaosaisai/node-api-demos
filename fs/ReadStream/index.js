/**
 * 创建一个可读流
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const filePath = path.resolve(__dirname, './baidu.txt')

{
    let paused = false
    let bytesRead = 0

    const file = fs.createReadStream(filePath)
    const filesize = fs.statSync(filePath).size

    // 已经读取的字节数
    assert.strictEqual(file.bytesRead, 0)

    // 监听流打开事件
    file.on('open', (fd) => {
        file.length = 0
        assert.strictEqual('number', typeof fd)
        assert.strictEqual(file.bytesRead, 0)
        assert.ok(file.readable)

        file.pause()
        file.resume()
        file.pause()
        file.resume()
    })
    // 监听读取到数据的事件
    file.on('data', (data) => {
        console.log('读取文件')
        assert.ok(data instanceof Buffer)
        assert.ok(!paused)

        // 读取到的文件流的长度
        file.length += data.length
        bytesRead += data.length

        assert.strictEqual(file.length, bytesRead)

        paused = true
        // 暂停读取文件
        file.pause()
        setTimeout(() => {
            paused = false
            file.resume()
        }, 10)
    })
    // 监听数据读取完毕的事件
    file.on('end', () => {
        console.log('读取文件结束')
        assert.strictEqual(filesize, file.bytesRead)
        assert.strictEqual(filesize, bytesRead)
    })
    // 监听关闭读文件流的事件
    file.on('close', () => {
        console.log('文件关闭')
        assert.strictEqual(filesize, file.bytesRead)
        assert.strictEqual(filesize, bytesRead)
    })

    process.on('exit', () => {
        console.log(file.length)
    })
}

// 读取文件的部分的内容
{
    const file = fs.createReadStream(path.resolve(__dirname, './rangeFile.txt'), {
        bufferSize: 1,
        start: 1,
        end: 2
    })
    let contentRead = ''
    file.on('data', (data) => {
        contentRead += data.toString('utf-8')
    })
    file.on('end', () => {
        console.log(contentRead)
        assert.strictEqual(contentRead, 'bc')
    })
}

// 开始索引和结束索引是相同的
{
    const file = fs.createReadStream(path.resolve(__dirname, './rangeFile.txt'), {
        start: 1, 
        end: 1
    })

    let contentRead = ''
    file.on('data', (data) => {
        contentRead += data.toString('utf8')
    })
    file.on('end', () => {
        assert.strictEqual(contentRead, 'b')
    })
}