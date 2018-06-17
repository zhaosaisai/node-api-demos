/**
 * fs.close(fd, callback)
 * 这个方法主要是通过一个文件描述符来关闭打开的文件
 */

 const fs = require('fs')
 const assert = require('assert')
 const path = require('path')

 const file = path.resolve(__dirname, 'close.txt')

 fs.open(file, 'w', (err, fd) => {
     assert.ifError(err)

     assert.strictEqual(typeof fd, 'number')
    //  关闭文件
    fs.close(fd, (err) => {
        assert.ifError(err)
    })
 })