/**
 * 当前文件所在的目录
 */
const assert = require('assert')
const path = require('path')

console.log(__dirname, path.dirname(__filename))
assert.strictEqual(__dirname, path.dirname(__filename))