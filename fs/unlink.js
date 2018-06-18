/**
 * fs.unlink(path, callback)
 * 这个方法主要是用于删除文件的
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, 'unlink.txt')

// 创建文件
fs.writeFileSync(file, '')

const dirs = fs.readdirSync('.')
assert.ok(dirs.includes('unlink.txt'))

// 删除文件
fs.unlink(file, err => {
    assert.ifError(err)
    const dirs = fs.readdirSync('.')
    assert.strictEqual(dirs.indexOf('unlink.txt'), -1)
})