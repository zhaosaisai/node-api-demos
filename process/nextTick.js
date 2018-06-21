/**
 * process.nextTick(callback, [args])
 * process.nextTick()方法将 callback 添加到"next tick 队列"。 
 * 一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。
 * 递归调用nextTick callbacks 会阻塞任何I/O操作，就像一个while(true); 循环一样。
 */
const N = 2

function cb() {
    throw new Error()
}

for (let i = 0; i < N; i++) {
    process.nextTick(cb)
}

process.on('uncaughtException', () => {})

process.on('exit', () => {
    process.removeAllListeners('uncaughtException')
})
