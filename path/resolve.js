/**
 * path.resolve([...path])
 * 这个方法会把一个路径或路径片段的序列解析为一个绝对路径。
 * 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
 * 
 * 生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录。
 */
 
 const path = require('path')

 console.log(path.resolve('/usr', '/usr1', 'abc'))
 console.log(path.resolve('/foo/bar', '/tmp/file/'))