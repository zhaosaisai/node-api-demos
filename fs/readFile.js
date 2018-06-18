/**
 * fs.readFile(path, [options], callback)
 * 这个方法主要是用于异步的读取一个文件的内容
 * 
 * options接收两个选项
 * flag：读取内容时候的标识，默认是r
 * encoding读取的文件的内容的编码格式
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

fs.readFile('/etc/passwd', (err, data) => {
    assert.ifError(err)
    assert.ok(Buffer.isBuffer(data))
})

fs.readFile('/etc/passwd', 'utf8', (err, data) => {
    assert.ifError(err)
    assert.ok(!Buffer.isBuffer(data))
})

// 当读取的文件不存在的时候会报错
fs.readFile('/path/none/exists', (err, data) => {
    assert.strictEqual(err.code, 'ENOENT')
    assert.equal(data, null)
})