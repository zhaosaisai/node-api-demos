/**
 * ReadStream.bytesRead
 * 表示已经被读取的字节数
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = fs.createReadStream(path.resolve(__dirname, './rangeFile.txt'))

assert.strictEqual(file.bytesRead, 0)

file.on('open', () => {
    assert.strictEqual(file.bytesRead, 0)
})

file.on('end', () => {
    assert.strictEqual(file.bytesRead, 8)
})

file.resume()