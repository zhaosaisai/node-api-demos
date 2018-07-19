/**
 * os.freemem()
 * 以字符串的形式返回空闲系统内存的字节数
 */

 const os = require('os')

 console.log(`系统的空闲内存的字节数是 ${os.freemem()}`)