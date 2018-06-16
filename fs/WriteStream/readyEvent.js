/**
 * 这个事件会在open之后立即触发
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, './README.md')
const writeStream = fs.createWriteStream(file)

let flag = 0
let fileD = null

writeStream.on('open', (fd) => {
    assert.strictEqual(flag++, 0)
    fileD = fd
})

writeStream.on('ready', () => {
    assert.strictEqual(flag, 1)
    assert.strictEqual(typeof fileD, 'number')
})