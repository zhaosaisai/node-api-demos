/**
 * module.paths
 *  返回的是模块的搜索路径
 */
 
 const assert = require('assert')

 assert.ok(Array.isArray(module.paths))
 
 console.dir(module.paths)