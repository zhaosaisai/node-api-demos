/**
 * process.uptime()
 * 返回当前nodejs进程运行的时长
 * 返回值是包含秒的分数，可以使用Math.floor获取整秒数
 */
console.log(process.uptime())
console.log(Math.floor(process.uptime()))

const start = Date.now()

while(Date.now() - start < 5000) {}

console.log(process.uptime())
console.log(Math.floor(process.uptime()))