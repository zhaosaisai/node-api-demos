/**
 * append(name, value)
 * 我们可以通过append方法向查询字符串中添加一个新的键值对
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const params = new URLSearchParams('name=abc&age=23')
 
 assert.strictEqual(params.get('name'), 'abc')
 assert.strictEqual(params.get('age'), '23')
 assert.strictEqual(params.get('id'), null)

 params.append('id', 0)
 assert.strictEqual(params.get('id'), '0')