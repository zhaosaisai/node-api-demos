/**
 * parse(str[, seq [,eq, options]])
 * 这个方法主要是用于解析查询字符串的
 * 
 * str是要解析的查询字符串
 * seq用于界定查询字符串中的键值对的子字符串。默认为 '&'。
 * eq用于界定查询字符串中的键与值的子字符串。默认为 '='。
 * 
 * options：
 *  decodeURIComponent：码查询字符串的字符时使用的函数。默认为 querystring.unescape()。
 *  maxKeys：指定要解析的键的最大数量。指定为 0 则不限制。默认为 1000。
 * 
 * 该方法会把一个 URL 查询字符串 str 解析成一个键值对的集合。
 * 该方法返回的对象不继承自 JavaScript 的 Object 类。 
 * 这意味着 Object 类的方法如 obj.toString()、obj.hasOwnProperty() 等没有被定义且无法使用。
 */

 const querystring = require('querystring')

 const q1 = 'foo=bar&abc=xyz&abc=123'
 const q2 = 'foo=bar|abc=xyz|abc=123'
 const q3 = 'foo_bar|abc_xyz|abc_123'

 console.log(querystring.parse(q1))
 console.log(querystring.parse(q2, '|'))
 console.log(querystring.parse(q3, '|', '_'))

