/**
 * 当fs.ReadStream的文件描述符被打开的时候触发
 * 回调函数接受一个参数就是这个文件的描述符
 */

 const fs = require('fs')
 const assert = require('assert')
 const path = require('path')

 const file = fs.createReadStream('./baidu.txt')

 file.on('open', (fd) => {
     console.log('file is opened', fd)
     assert.ok(typeof fd === 'number')
 })