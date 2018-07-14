/**
 * querystring.escape(str)
 * 这个方法主要是用于对给定的url进行编码
 * 这个方法是提供给querystring.stringify()方法使用，通常不直接使用
 */

 const querystring = require('querystring')

 const query = 'name=abc&age=23&id='

 console.log(querystring.escape(query))