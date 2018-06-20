/**
 * process.cwd()
 * 这个方法返回当前nodejs进程的工作目录
 * 可以通过process.chdir()来改变
 */
const log = console.log.bind(console)

log(process.cwd())
process.chdir('/usr/bin')
log(process.cwd())
