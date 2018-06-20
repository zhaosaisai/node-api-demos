/**
 * 如果在javascript运行的过程中出现了未被捕获3的异常，就会触发process上的uncaughtException事件
 * 默认情况下，nodejs会将这些异常打印到终端，然后退出。我们可以自己设置这个事件的监听器来覆盖
 * 上面默认的行为。这个事件的参数是一个 Error 实例
 */

 const assert = require('assert')

//  绑定一个异常处理器
process.on('uncaughtException', (e) => {
    assert.ok(e instanceof Error)
    assert.strictEqual(e.message, 'error message')
    console.log('Exception was caught')
})

// 抛出一个异常
throw new Error('error message')