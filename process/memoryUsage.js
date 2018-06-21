/**
 * process.memoryUsage()
 * 这个方法主要是用于获取Nodejs进程的内存的使用情况的对象
 * 这个对象的每个属性的值都是字节
 * {
 *      rss: 进程常驻内存，包括指令区和堆栈。
 *      heapTotal: 已申请的堆内存，包括用到的和没用到的。
 *      heapUsed: 已使用的量
 *      external:  V8 引擎内部的 C++ 对象占用的内存。
 * }
 */
const assert = require('assert')

const memoryUsage = process.memoryUsage()

assert.strictEqual(Object(memoryUsage), memoryUsage)

console.log(
    JSON.stringify(memoryUsage, null, 4)
)

assert.ok(memoryUsage.rss > 0)
assert.ok(memoryUsage.heapTotal > 0)
assert.ok(memoryUsage.heapUsed > 0)
assert.ok(memoryUsage.external > 0)