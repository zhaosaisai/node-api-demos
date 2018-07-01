/**
 * readable.setEncoding(encoding)
 * 这个方法主要用于设置可读流读取的内容的编码格式。
 * 读取的内容默认返回的是Buffer对象
 */

 const fs = require('fs')
 const assert = require('assert')

 const r = fs.createReadStream('./end.ss')
 
 // 暂停流
 r.pause()
 
 r.on('readable', () => {
    assert.ok(Buffer.isBuffer(r.read(1)))
 })