/**
 * fs.stat(path, callback)
 * 这个方法主要是用于获取指定路径的文件的状态信息
 * 这个方法的回调函数函数的第二个参数就是文件的状态对象
 * 
 * 如果我们要检查一个文件是否存在，可以使用fs.access
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

fs.stat(__filename, (err, stat) => {
    assert.ifError(err)
    console.log(JSON.stringify(stat, null, 2))
})