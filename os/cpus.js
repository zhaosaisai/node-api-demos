/**
 * os.cpus()
 * 这个方法返回的是一个对象数组，包含了每个逻辑cpu内核的信息
 */
 
 const os = require('os')

 console.log(`我的cpu内核的数目是 ${os.cpus().length}`)
 console.log(JSON.stringify(os.cpus(), null, 4))
 