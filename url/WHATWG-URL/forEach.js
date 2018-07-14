/**
 * forEach(fn, [thisArg])
 * 再查询字符串的每个键值对上调用对应的函数
 */

 const { URLSearchParams } = require('url')

 const params = new URLSearchParams('name=abc&age=23')

 params.forEach((value, name) => {
     console.log(`${name} ===> ${value}`)
 })
 