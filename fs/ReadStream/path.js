/**
 * ReadStream.path表示的是当前流正在读取的文件的路径
 * 一般是createReadStream的第一个参数
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, './baidu.txt')
// 仍然表示的是一个文件的路径
const buffer = Buffer.from('abc')

const fileReader1 = fs.createReadStream(file)
const fileReader2 = fs.createReadStream(buffer)

assert.strictEqual(typeof fileReader1.path, 'string')
assert.strictEqual(fileReader1.path, file)

assert.ok(Buffer.isBuffer(fileReader2.path))
assert.ok(fileReader2.path, buffer)