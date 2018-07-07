/**
 * module.children
 * 这个 属性返回了当前模块所引入的子模块。是一个数组
 * 
 * 这个属性不包含模块中引入的核心模块
 */

 const test = require('./test')
 const resolve = require('./resolve')
 const assert = require('assert')

 assert.ok(Array.isArray(module.children))
 
 console.log(module.children)