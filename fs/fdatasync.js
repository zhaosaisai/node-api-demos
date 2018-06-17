/**
 * fs.fdatasync(fd, callback)
 * 这个方法接收文件的打开描述符作为第一个参数
 * 主要用于同步数据到磁盘中
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, 'README.md')
const fd = fs.openSync(file, 'r')

fs.fstatSync(fd, (err) => {
    assert.ifError(err)
    console.log('数据已完全同步到磁盘中')
})
