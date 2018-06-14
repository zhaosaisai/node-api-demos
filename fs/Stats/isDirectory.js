/**
 * stat.isDirectory()
 * 如果文件是一个目录的话，就返回true
 */
const fs = require('fs')
const assert = require('assert')

fs.stat('.', (err, stat) => {
    assert.ok(stat.isDirectory())
})