/**
 * fs.ftruncate(fd, [len], callback)
 * 这个方法通过一个文件打开描述符来截断一个文件
 * 如果len没有传递，则表示清空文件
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, 'ftruncate-file.txt')
const msg = 'hello world'
fs.writeFileSync(file, msg, 'utf8')

const fd = fs.openSync(file, 'r+')

fs.ftruncate(fd, 5, (err) => {
    assert.ifError(err)
    assert.strictEqual(fs.readFileSync(file, 'utf8'), msg.slice(0, 5))
})