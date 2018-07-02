/**
 * Duplex stream是双工流，双工流就是同时具有可读和可写的功能。
 * 
 * 自定义的双工流必须实现 readable._read 和 readable._write方法
 * 
 * 创建一个双工流可以通过如下的方式进行：
 *  new stream.duplex(options) 
 *  options是传递给可读和可写流的选项，主要包含如下的几个选项：
 *      allowHalfOpen：如果设置为false，那么当读端停止的时候，写端也会自动停止
 *      readableObjectMode：默认是 false。会为流的读端设置objectMode。
 *      writableObjectMode：默认是 false。会为流的写端设置objectMode
 *      readableHighWaterMark：设置 highWaterMark 可读流的缓冲区大小。 如果已经设置 highWaterMark则readableHighWaterMark不起作用。
 *      writableHighWaterMark：设置 highWaterMark 可写流缓冲区大小。如果设置了highWaterMark 则writableHighWaterMark不起作用。
 */

 const { Duplex } = require('stream')
 const assert = require('assert')

 let read
 let written

 const duplex = new Duplex({
     objectMode: true
 })

 assert(Duplex() instanceof Duplex)
 assert(duplex._readableState.objectMode)
 assert(duplex._writableState.objectMode)

 duplex._write = (data, enc, cb) => {
     written = data
     cb()
 }

 duplex._read = () => {}

 duplex.on('data', chunk => {
     read = chunk
 })

 duplex.push({
     val: 1
 })

 duplex.end({
     val: 2
 })

 process.on('exit', () => {
    assert.strictEqual(read.val, 1)
    assert.strictEqual(written.val, 2)
 })