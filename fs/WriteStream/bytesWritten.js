/**
 * 已写入的字节数，不包含仍在排队等待写入的字节
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, './write.txt')
const ws = fs.createWriteStream(file)
const content = Buffer.from('abc')

ws.write(content)

ws.on('close', () => {
    console.log('Closed')
    assert.strictEqual(ws.bytesWritten, content.byteLength)
})

process.on('beforeExit', () => {
    ws.destroy()
})