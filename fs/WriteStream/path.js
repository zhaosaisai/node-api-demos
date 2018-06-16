/**
 * WriteStream.path表示的是当前流正在读取的文件的路径
 * 一般是createWriteStream的第一个参数
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, './write.txt')
// 仍然表示的是一个文件的路径
const buffer = Buffer.from(file)

const fileWriter1 = fs.createWriteStream(file)
const fileWriter2 = fs.createWriteStream(buffer)

assert.strictEqual(typeof fileWriter1.path, 'string')
assert.strictEqual(fileWriter1.path, file)

assert.ok(Buffer.isBuffer(fileWriter2.path))
assert.ok(fileWriter2.path, buffer)