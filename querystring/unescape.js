/**
 * 对给定的 str 进行解码。
 * 默认使用 JavaScript 内置的 decodeURIComponent() 方法来解码。
 */

 const querystring = require('querystring')

 const e = querystring.escape('name=abc&id=社么')

 console.log(e)
 console.log(querystring.unescape(e))
 