/**
 * fs.chown(path, uid, gid, callback)
 * 异步的改变文件的所有者和所属组
 * 回调函数只有一个可能异常的参数
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, 'chown.txt')

function createFile(path) {
    fs.closeSync(fs.openSync(path, 'w'))
}

createFile(file)

fs.chown(file, 1, 1, (err) => {
    assert.ifError(err)
})