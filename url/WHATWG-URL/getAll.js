/**
 * 返回键是name的所有键值对的值，如果没有满足条件的键值对，则返回一个空的数组。
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const params = new URLSearchParams('name=abc&age=24&age=25')

 console.log(params.getAll('name'))
 console.log(params.getAll('age'))

 assert.deepStrictEqual(params.getAll('age'), ['24', '25'])