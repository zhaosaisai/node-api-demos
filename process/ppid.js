/**
 * process.ppid
 * 返回当前nodejs进程的父进程的id
 */
console.log(
    `你的进程的pid是${process.pid}`,
    `你的父进程的pid是${process.ppid}`
)