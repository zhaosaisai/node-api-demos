/**
 * 当fs.ReadStream已经准备好时候触发
 * 在open之后立即触发 
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

let id = 0

const file = fs.createReadStream(path.resolve(__dirname, './baidu.txt'))

file.on('open', () => {
    assert.strictEqual(0, id++)
})

file.on('ready', () => {
    assert.strictEqual(1, id)
})