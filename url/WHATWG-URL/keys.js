/**
 * 这个方法主要是用于获取查询字符串的所有的键的迭代器
 */

 const { URLSearchParams } = require('url')

 const params = new URLSearchParams('name=abc&age=23')

 for (let key of params.keys()) {
     console.log(key)
 }