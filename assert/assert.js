/**
 * assert(value[, message])
 * 要检查的值是否为真值
 * 
 * 如果要检查的值不是真值，会抛出message
 * 
 * 这个方法和assert.ok是等价的
 */

 const assert = require('assert')

 assert(true, 'true不是真值')
 assert(false, 'false不是真值')
 assert(1, '1不是真值')
 assert(0, '0不是真值')