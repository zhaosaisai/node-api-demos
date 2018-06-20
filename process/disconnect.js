/**
 * process.disconnect()
 * 如果nodejs进程是通过IPC通道创建的，那么调用这个方法就会断开子进程和
 * 父进程之间的IPC通道。这个方法和在父进程中调用childProcess.disconnect
 * 作用是一样的
 * 
 * 如果nodejs的进程不是通过IPC通道创建的，那么调用这个方法的返回值是undefined
 */
const assert = require('assert')
const fork = require('child_process').fork

if (process.argv[2] === 'child') {
    // 子进程
    process.on('disconnect', () => {
        console.log('断开了')
    })
    process.nextTick(() => {
        process.disconnect()
    })
} else {
    // 父进程
    const child = fork(__filename, ['child'])
    child.on('disconnect', () => {
        console.log('子进程断开了')
    })
}