/**
 * path.basename(path, [ext])
 * 这个方法返回一个path的最后一部分，第二个参数是一个可选的参数，用于指定文件的扩展名。
 * 
 * ext我们可以理解成从返回的结果中去除的文件后缀名。
 * 
 * 参数path和ext必须是一个字符串，否则会抛出错误
 */

 const path = require('path')
 const assert = require('assert')

 console.log(path.basename(__filename))
 assert.strictEqual(path.basename(__filename), 'basename.js')

 console.log(path.basename(__filename, '.js'))
 assert.strictEqual(path.basename(__filename, '.js'), 'basename')

 console.log(path.basename(__filename, 'js'))
 assert.strictEqual(path.basename(__filename, 'js'), 'basename.')

 console.log(path.basename('./basename.test.js', '.test.js'))
 assert.strictEqual(path.basename('./basename.test.js', '.test.js'), 'basename')