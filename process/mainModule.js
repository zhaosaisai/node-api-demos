/**
 * process.mainModule是require.main的一种替代方式
 * 区别就是如果模块在运行的过程中发生了变化，require.main仍然指向变化之前的模块
 * 
 * 一般来说可以认为二者是相同的
 */

const assert = require('assert')

assert.deepStrictEqual(
    process.mainModule,
    require.main
)