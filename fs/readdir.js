/**
 * fs.readdir(path, options, callback)
 * 读取一个目录的内容。 回调有两个参数 (err, files)，
 * 其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组。
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const readdirDir = path.resolve(__dirname, 'tmp')
const files = ['empty', 'files', 'for', 'just', 'testing']

// 创建必需的文件
files.forEach(file => {
    fs.closeSync(fs.openSync(`${readdirDir}/${file}`, 'w'))
})

// 检查文件是否创建完毕
assert.deepStrictEqual(files, fs.readdirSync(readdirDir).sort())

// 通过异步的方法来读取文件夹
fs.readdir(readdirDir, (err, f) => {
    assert.ifError(err)
    assert.deepStrictEqual(f, files)
})

// 如果readdir接收一个文件作为参数，则会抛出错误
fs.readdir(__filename, (e) => {
    assert.strictEqual(e.code, 'ENOTDIR')
})