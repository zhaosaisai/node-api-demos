/**
 * stat.isSocket()
 * 如果一个对象是一个socket文件，则返回true
 * 比如说mysql 运行的时候通常会产生一个socket文件。
 * ls -l /tmp/mysql.sock
 */

 const fs = require('fs')
 const assert = require('assert')

 fs.stat('./isFile.js', (err, stat) => {
     assert.ok(!stat.isSocket())
 })

 fs.stat('/tmp/com.apple.launchd.9xmhhttvwY/Listeners', (err, stat) => {
     assert.ok(stat.isSocket())
 })