/**
 * fs.write(fd, buffer[, offset[, length[, position]]], callback)
 * 这个方法的主要作用就是，将指定的buffer中的内容写入到指定的打开文件中
 * 其中，buffer就是存储原始数据的buffer
 * fd就是打开的文件
 * offset就是buffer中要写入的内容的起止位置
 * length表示的是要写入的字节数
 * position表示的是在文件中的写入偏移量
 * callback接收三个参数，第二个参数表示已经被写入的字节数，第三个参数表示保存内容的那个buffer的引用
 */

 const fs = require('fs')
 const path = require('path')
 const assert = require('assert')

 const file = path.resolve(__dirname, 'write.txt')
 const buffer = Buffer.from('Hello World')
 const fd = fs.openSync(file, 'a+')
 const string = '你好中国'

 function writeBuffer(callback) {
    fs.write(fd, buffer, 2, 3, (err, writtenByte, buf) => {
        assert.ifError(err)
        assert.strictEqual(writtenByte, 3)
        assert.strictEqual(buf, buffer)
        const content = fs.readFileSync(file, 'utf8')
        assert.strictEqual(content, 'llo')
        if (callback) {
            callback()
        } else {
            fs.closeSync(fd)
        }
     })
 }

 function writeString(callback) {
     fs.write(fd, string, 3, 'utf8', (err, bytes, str) => {
         assert.ifError(err)
         assert.strictEqual(Buffer.byteLength(string), bytes)
         assert.strictEqual(str, string)
         const content = fs.readFileSync(file, 'utf8')
         assert.strictEqual(content, `llo${string}`)
         if (callback) {
            callback()
        } else {
            fs.closeSync(fd)
        }
     })
 }
 
 writeBuffer(writeString)