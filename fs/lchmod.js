/**
 * fs.lchmod(path, mode, callback)
 * 这个方法主要是用于更改文件权限（不解析符号链接）
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, 'futimes.txt')
const linkFile = path.resolve(__dirname, 'futimes-link.txt')
const mode = 0o777

// 创建一个软连接
fs.symlinkSync(file, linkFile)
// 文件原有的权限是
console.log(`文件原有的权限是：${fs.lstatSync(linkFile).mode & mode}`)
// 更改软连接的权限
fs.lchmod(linkFile, mode, (err) => {
    assert.ifError(err)
    console.log(`文件的权限是：${fs.lstatSync(linkFile).mode & mode}`)
})