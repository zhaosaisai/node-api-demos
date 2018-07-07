/**
 * module.parent
 * 这个属性返回的是最先引用这个模块的对象的引用
 */

 const { p } = require('./test')
 const assert = require('assert')
 
 assert.strictEqual(p, module)