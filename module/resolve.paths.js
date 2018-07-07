/**
 * 这个方法接收一个路径作为参数，返回的是一个数组。这个数组包含了在解析这个模块的时候所经过的一系列
 * 路径。如果参数是一个核心模块的话，则会返回null
 */

 const assert = require('assert')

 assert.strictEqual(require.resolve.paths('http'), null)
 assert.ok(Array.isArray(require.resolve.paths('./test')))

 console.log(require.resolve.paths('./test'))