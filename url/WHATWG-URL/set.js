/**
 * 这个方法主要是用于设置查询字符串中的某个值
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const params = new URLSearchParams('name=abc&age=24')

 console.log(params.toString())
 
 assert.strictEqual(params.get('name'), 'abc')
 assert.strictEqual(params.get('age'), '24')
 assert.strictEqual(params.get('id'), null)

 params.set('id', 0)
 params.set('name', 'xyz')

 assert.strictEqual(params.get('name'), 'xyz')
 assert.strictEqual(params.get('age'), '24')
 assert.strictEqual(params.get('id'), '0')