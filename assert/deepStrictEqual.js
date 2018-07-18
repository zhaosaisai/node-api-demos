/**
 * assert.deepStrictEqual(actual, expected[, message])
 * 
 * 这个方法主要是用于判断actual和expected是否深度相等
 * 如果二者不深度相等，会抛出message的错误
 * 
 * 与其相反的是 assert.notDeepStrictEqual
 */

 const assert = require('assert')

//  会抛出错误，因为 1 和 '1' 是不相等的
//  assert.deepStrictEqual({a: '1'}, {a: 1})

// NaN  和 NaN 也会抛出错误
// assert.deepStrictEqual(NaN, NaN)

assert.deepStrictEqual(new String('foo'), Object('foo'))

// 0 和 -0 比较也是不通过的 
// assert.deepStrictEqual(0, -0)