/**
 * has(name)
 * 判断查询字符串中是否存在对应键
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const params = new URLSearchParams('name=abc&age=24')
 
 assert.ok(params.has('name'))
 assert.ok(params.has('age'))

 assert.ok(!params.has('id'))
