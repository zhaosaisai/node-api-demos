/**
 * assert.doesNotThrow(block[, error][, message])
 *  断言 block 函数不会抛出错误。
 * 
 * 当 assert.doesNotThrow() 被调用时，它会立即调用 block 函数。
 * 
 * 如果抛出错误且错误类型与 error 参数指定的相同，则抛出 AssertionError。 如果错误类型不相同，或 error 参数为 undefined，则抛出错误。
 * 
 */

 const assert = require('assert')

 assert.doesNotThrow(() => { throw new TypeError('类型错误') }, TypeError)

 assert.doesNotThrow(() => { throw new TypeError('类型错误') }, SyntaxError)

 assert.doesNotThrow(() => { throw new TypeError('类型错误') })