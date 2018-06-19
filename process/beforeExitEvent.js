/**
 * 当Nodejs时间循环的数组为空，并且没有额外的工作被添加进来的时候，事件beforeExit就会被触发
 * 一般的情况下，如果没有额外的工作被添加到事件循环中，那么nodejs进程将会退出。但是，
 * 如果我们在beforeExit的事件回调中包含了一个异步的操作，那么nodejs的进程是不会退出的
 * 
 * 这个事件的事件回调接收一个process.exitCode作为唯一的参数值传递给这个事件的回调函数
 * 如果进程因为显示的原因被终止，比如调用了 process.exit方法或者 抛出了异常，那么beforeExit是不会被触发的
 */
const net = require('net')

process.once('beforeExit', tryImmediate)

function tryImmediate() {
    console.log('come in setImmediate')
    setImmediate(() => {
        process.once('beforeExit', tryTimer)
    })
}

function tryTimer() {
    console.log('come in timer')
    setTimeout(() => {
        process.once('beforeExit', tryListener)
    }, 1)
}

function tryListener() {
    console.log('come in listener')
    const server = net.createServer()
        .listen(0)
        .on('listening', () => {
            server.close()
            process.once('beforeExit', tryRepeatedTimer)
        })
}

function tryRepeatedTimer() {
    const N = 5
    let n = 0
    const repeatedTimer = () => {
        console.log(`repeatedTime at ${n}`)
        if (++n < N) {
            setTimeout(repeatedTimer, 1)
        }
    }
    setTimeout(repeatedTimer, 1)
}