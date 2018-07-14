/**
 * 返回键是name的第一个键值对的值。如果没有对应的键值对，则返回null。
 */

 const { URLSearchParams } = require('url')

 const params = new URLSearchParams('name=abc&age=23')

 console.log(params.get('name'))
 console.log(params.get('id'))