/**
 * assert.ifError(value)
 * 如果value的值不是undefined或者null的话，会抛出value
 */
const assert = require('assert')

// assert.ifError(true)

assert.ifError(new Error('类型错误'))