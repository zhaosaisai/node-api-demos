/**
 * 这个方法可以使nodejs的进程立即结束,并生成一个core文件。
 */
setTimeout(() => {
    console.log('我将会被输出出来')
})

setTimeout(() => {
    console.log('我也会被输出出来')
    process.abort()
}, 100)

setTimeout(() => {
    console.log('我不会被输出出来')
}, 200);

process.on('exit', () => {
    console.log('这个事件是不会被触发的')
})