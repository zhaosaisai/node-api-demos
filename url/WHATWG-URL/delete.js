/**
 * delete(name)
 * 这个方法主要是用于删除所有键为name的查询字符串
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const params = new URLSearchParams('name=abc&age=23')
 
 assert.strictEqual(params.get('name'), 'abc')
 assert.strictEqual(params.get('age'), '23')

 params.delete('name')
 params.delete('age')

 assert.strictEqual(params.get('name'), null)
 assert.strictEqual(params.get('age'), null)