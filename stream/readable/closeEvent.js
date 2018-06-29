/**
 * close事件将在流或者底层的资源被关闭的时候触发。close事件关闭后，这个流将不会触发任何的事件了。
 * 
 * 可以通过closed来判断流是否已经被关闭
 */

 const fs = require('fs')
 const stream = require('stream')
 const assert = require('assert')

 class MyWritable extends stream.Writable {
     constructor(options) {
         super(options)
     }
     _write(chunk, encoding, cb) {
         cb()
     }
 }

 const writable = new MyWritable({})
 const readable = fs.createReadStream('../index.js')

 assert.strictEqual(!!readable.closed, false)

//  监听close事件
 readable.on('close', () => {
    assert.strictEqual(readable.closed, true)
     console.log('可读流被关闭了')
 })

 readable.pipe(writable)