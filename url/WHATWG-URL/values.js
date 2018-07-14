/**
 * 这个方法主要是返回查询字符串中的value的迭代器
 */

 const { URLSearchParams } = require('url')

 const params = new URLSearchParams('name=abc&age=23')

 for (let value of params.values()) {
    console.log(value)
 }