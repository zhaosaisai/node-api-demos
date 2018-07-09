/**
 * path.extname(path)
 * 这个方法返回的是指定path的文件的扩展名称
 * 即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 
 * 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，
 * 则返回一个空字符串。
 */

 const path = require('path')

 console.log(path.extname(__filename))
 console.log(path.extname(__dirname))
 console.log(path.extname(`${__filename}.`))