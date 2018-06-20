/**
 * process.cpuUsage()方法返回的是当前进程的用户cpu时间和系统cpu时间对象
 * 这个对象包含user和system属性，属性值的单位都是微秒
 * user表示的是执行用户程序的时间
 * system表示的是系统程序的时间
 * 
 * 这个方法接收一个参数，是上次调用这个方法的返回值，然后返回二者之间的差值
 * 这个参数必须也要有上述的属性
 */
const assert = require('assert')
const result = process.cpuUsage()

// 确保返回的是正确的数据结构
function validateResult(result) {
    assert.notStrictEqual(result, null)

    assert(Number.isFinite(result.user))
    assert(Number.isFinite(result.system))

    assert(result.user >= 0)
    assert(result.system >= 0)
}

validateResult(result)

// Validate the result of calling with a previous value argument.
validateResult(process.cpuUsage(result))

// Ensure the results are >= the previous.
let thisUsage
let lastUsage = process.cpuUsage()

for (let i = 0; i < 10; i++) {
    thisUsage = process.cpuUsage()
    assert(thisUsage.user >= lastUsage.user)
    assert(thisUsage.system >= lastUsage.system)
    lastUsage = thisUsage
}

// Ensure that the diffs are >= 0.
let startUsage
let diffUsage
for (let i = 0; i < 10; i++) {
    startUsage = process.cpuUsage()
    diffUsage = process.cpuUsage(startUsage)
    validateResult(startUsage)
    validateResult(diffUsage)
    assert(diffUsage.user >= 0)
    assert(diffUsage.system >= 0)
}