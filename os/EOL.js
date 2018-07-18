/**
 * os.EOL是一个常量，表示的是操作系统的换行符的标志。
 *  - \n 在POSIX系统上
 *  - \r\n 在windows系统上
 */

 const os = require('os')

 console.log(`我的系统的换行符是：${os.EOL}`)

 console.log(`这个会${os.EOL}换行吗`)