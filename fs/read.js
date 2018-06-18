/**
 * fs.read(fd, buffer, offset, length, position, callback)
 * 这个方法主要是通过一个打开的文件的标识符来读取内容
 * buffer：将读取的内容存入buffer中
 * offset：是buffer开始写入的偏移量
 * length：是一个整数，指定将要读取的字节数
 * position：指定从文件中读取的位置，如果 position 为 null，则数据从当前文件读取位置开始读取，且文件读取位置会被更新。 
 * 如果 position 为一个整数，则文件读取位置保持不变。
 * 
 * 回调函数会接受三个参数，后面两个参数分别是bytesRead, buffer
 * 
 * 上面的方法中的参数都是必需参数
 */

 const fs = require('fs')
 const assert = require('assert')
 const path = require('path')

 const file = path.resolve(__dirname, 'read.txt')
 const msg = 'hello world'
 fs.writeFileSync(file, msg)

 const buffer = Buffer.alloc(3)
 const fd = fs.openSync(file, 'r+')
 
 fs.read(fd, buffer, 0, 3, null, (err, bytesRead, buf) => {
     assert.ifError(err)
     assert.strictEqual(bytesRead, 3)
     assert.strictEqual(buffer, buf)
     // 再读取一次
     fs.read(fd, buffer, 0, 3, null, (err, bytesRead, buf) => {
         assert.ifError(err)
         assert.strictEqual(bytesRead, 3)
         assert.strictEqual(buf.toString(), 'lo ')
     })
 })

 