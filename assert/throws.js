/**
 * assert.throws(block[, error][, message])
 * 断言 block 函数会抛出错误。
 * 
 * 更详细的例子
 * http://nodejs.cn/api/assert.html#assert_assert_throws_block_error_message
 */

 const assert = require('assert')

 const err = new Error('抛出错误')

 assert.throws(() => {
    throw err
 }, Error)

 assert.throws(() => {
     console.log(1)
     console.log(a)
 }, Error)