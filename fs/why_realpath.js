/**
 * fs.realpath(path, [options], callback)
 * 这个方法主要是用于获取文件的真实路径
 * 
 * 解析后的路径回作为回调函数的第二个参数进行传递
 * 可以使用 process.cwd 解析相对路径。
 * 
 * 这个方法主要是用于获取path的绝对路径
 */
// TODO: 这个api的例子不是很完整
const fs = require('fs')
const path = require('path')
const assert = require('assert')

fs.realpath('./realpath.js', (err, resolvedPath) => {
    assert.ifError(err)
    assert.strictEqual(resolvedPath, path.resolve(__dirname, './realpath.js'))
})

// 为什么
fs.realpath('/etc/services', (err, resolvedPath) => {
    console.log(resolvedPath)
})
