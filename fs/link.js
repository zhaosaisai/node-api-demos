/**
 * fs.link(existingPath, newPath, callback)
 * 这个方法主要是用来创建硬链接
 * 第二个参数表示的是工作路径，默认是当前工作目录
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, 'link.txt')
const hardLinkPath = path.resolve(__dirname, 'hard-link.txt')

// 向源文件中写入内容
fs.writeFileSync(file, 'hello world')

function callback(err) {
    assert.ifError(err)
    const dstContent = fs.readFileSync(hardLinkPath, 'utf8')
    assert.strictEqual('hello world', dstContent)
}

// 创建一个硬链接
fs.link(file, hardLinkPath, callback)
