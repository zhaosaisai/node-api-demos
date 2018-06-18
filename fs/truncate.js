/**
 * fs.truncate(path, [len], callback)
 * 这个方法用于 清空 或者 截断 文件
 * 
 * 第二个参数是一个可选的参数表示截断内容时候的位置
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, 'truncate.txt')
const msg = 'hello world'

// 创建文件
fs.writeFileSync(file, msg)

function verify(content) {
    assert.strictEqual(fs.readFileSync(file, 'utf8'), content)
}

fs.truncate(file, 5, (err) => {
    assert.ifError(err)
    verify('hello')
    fs.truncate(file, (err) => {
        assert.ifError(err)
        verify('')
    })
})