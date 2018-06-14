/**
 * stat.isFile()
 * 如果是一个标准文件的话则返回true
 */
const fs = require('fs')
const assert = require('assert')

fs.stat('./index.js', (err, stat) => {
    assert.ok(stat.isFile())
})

fs.stat('.', (err, stat) => {
    assert.ok(!stat.isFile())
})