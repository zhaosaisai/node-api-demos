/**
 * querystring.stringify(obj[, sep[, eq[, options]]])
 * 
 * 该方法通过遍历给定的 obj 对象的自身属性，生成 URL 查询字符串。
 */

 console.log(
     require('querystring').stringify({ foo: 'bar', baz: 'qux' }, ';', ':')
 )