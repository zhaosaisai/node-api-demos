/**
 * process.kill(pid, [signal])
 * 这个方法主要用于向某个进程发送信号，结束两个参数，第一个参数就是要杀死的进程的id，
 * 第二个参数就是在杀死进程的时候需要发送的信号
 * 
 * 如果pid对应的进程不存在这个方法会抛出一个错误，我们可以通过信号0来检测对应的进程是否存在
 * 
 * 这个方法类似于kill命令，用于向某个进程发送信号，并不一定会杀死进程
 */

//  进程的pid需要是一个整数，下面的这些情况会抛出错误
(['SIGTERM', null, undefined, NaN, Infinity, -Infinity]).forEach(p => {
    try {
        process.kill(p)
    } catch (e) {
        console.log(e.message)
    }
})

// kill进程的时候的信号的名称不能是随意的必须是具有某些特定含义的信号的名称
try {
    process.kill(0, 'A mask signal name')
} catch (e) {
    console.log(e.message)
}
// 进程事件
process.on('SIGHUP', () => {
    console.log('Got the SIGHUAP signal')
})

// 这个任务会被添加的事件循环中来确保进程不会立马退出
// 否则SIGHUP事件是无法被触发的
setTimeout(() => {
    process.exit(0)
}, 1000)

process.kill(process.pid, 0)
process.kill(process.pid, 'SIGHUP')
