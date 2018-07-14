/**
 * entries()这个方法主要是获取查询字符串的迭代器对象
 * 迭代器的每一项都是一个javascript数组。数组的第一个元素是键，第二个元素是对应的value
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const params = new URLSearchParams('name=abc&age=23')
 
 for (let entry of params.entries()) {
     assert.ok(Array.isArray(entry))
     console.log(entry)
 }