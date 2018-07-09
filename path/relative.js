/**
 * path.relative(from, to)
 * 这个方法返回了两个路径的相对位置
 * 返回从 from 到 to 的相对路径
 * 
 * 返回值可以理解成通过什么样的路径操作，可以从from进入到to
 */

 const path = require('path')

 console.log(path.relative(__filename, '../'))
 console.log(path.relative(__filename, '/usr/bin'))
 console.log(path.relative(__filename, '/usr/bin1'))