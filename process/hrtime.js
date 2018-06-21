/**
 * process.hrtime([time])
 * 这个方法返回一个数组，表示的是当前的高精度数值。这个数组包含两个元素，第一个元素以秒为单位
 * 第二个参数是用秒无法表示的剩余部分
 * 
 * 参数是一个可选的参数，是上次调用process.hrtime的返回值。用于和本次的调用来计算差值。
 * 如果传入的参数不是一个数组会抛出TypeError的错误
 * 如果传入的不是上次调用的返回值，就相当于没有传递任何参数
 * 
 * 这个方法最长使用在测量某段代码的性能
 */
const assert = require('assert')

const tuple = process.hrtime()

console.log(tuple)

function validateTuple(tuple) {
    assert(Array.isArray(tuple))
    assert.strictEqual(tuple.length, 2)
    assert(Number.isInteger(tuple[0]))
    assert(Number.isInteger(tuple[1]))
}

validateTuple(tuple)
validateTuple(process.hrtime(tuple))

// 下面的调用形式都是会出错的
const a = [1, '', [1]]
a.forEach(v => {
    try {
        process.hrtime(v)
    } catch (e) {
        console.log(e.message)
    }
})

const start = process.hrtime()
const NS_PER_SEC = 1e9;
let t = Date.now()

while (Date.now() - t < 5000) {}

const diff = process.hrtime(start)

console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`)