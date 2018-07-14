/**
 * 这个方法主要是返回序列化之后的字符串，会对特殊字符进行编码
 */
const { URLSearchParams } = require('url')

const params = new URLSearchParams('name=abc&age=23')

console.log(params)
console.log(params.toString())