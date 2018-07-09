/**
 * delimiter属性表示的是特定平台上的路径分隔符
 * 
 * windows上是;
 * posix上是:
 */

 const path = require('path')

 console.log(`System path delimiter is ${path.delimiter}`)

 console.log(
     process.env.PATH.split(path.delimiter)
 )