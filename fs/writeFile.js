/**
 * fs.writeFile(file, data[, options], callback)
 * 这个方法是向指定的文件写入内容
 * path可以是表示文件路径的字符串也可以是文件的打开描述符，
 * 注意：如果 file 指定为一个文件描述符，则它不会被自动关闭。
 * 第二个参数就是指定的要写入的内容
 * options：可以设置写入内容的编码格式(encoding)和创建文件的模式(mode)和文件的打开模式(flag)
 * 回调函数只接收一个表示写入成功与否的参数
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, 'writeFile.txt')
const msg = 'Hello World 你好世界'

fs.writeFile(file, msg, 'utf8', (err) => {
    assert.ifError(err)
    const content = fs.readFileSync(file, 'utf8')
    assert.strictEqual(content, msg)
    fs.writeFile(file, msg, {
        encoding: 'utf8',
        flag: 'a+'
    }, (err) => {
        assert.ifError(err)
        const content = fs.readFileSync(file, 'utf8')
        assert.strictEqual(content, msg.repeat(2))
    })
})