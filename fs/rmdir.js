/**
 * fs.rmdir(path, callback)
 * 这个方法主要是用于删除文件夹
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, 'rmdir')

// 创建一个文件夹
fs.mkdir(file, (err) => {
    assert.ifError(err)
    console.log('文件夹创建成功')
    process.nextTick(() => {
        fs.rmdir(file, (err) => {
            assert.ifError(err)
            console.log('文件夹删除成功')
        })
    })
})