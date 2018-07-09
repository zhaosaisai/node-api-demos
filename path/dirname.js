/**
 * path.dirname(path)
 * 这个方法返回指定的path所在的目录
 */

 const path = require('path')
 const assert = require('assert')

 console.log(path.dirname(__filename))
 assert.strictEqual(path.dirname(__filename), __dirname)