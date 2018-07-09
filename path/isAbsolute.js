/**
 * path.isAbsolute(path)
 * 这个方法主要是用于判断指定的path是不是一个绝对路径
 * 如果给定的 path 是一个长度为零的字符串，则返回 false。
 */

 const path = require('path')

 console.log(path.isAbsolute('/foo/bar'))
 console.log(path.isAbsolute('/baz/..'))
 console.log(path.isAbsolute('qux/'))
 console.log(path.isAbsolute('.'))
 console.log(path.isAbsolute(__filename))
 console.log(path.isAbsolute(__dirname))