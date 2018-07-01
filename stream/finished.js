/**
 * stream.finished(stream, callback)
 * stream是一个可读或者可写的流
 * callback是一个回调函数，可以带一个错误信息参数，也可没有
 * 
 * 使用这个方法可以让一个流不再可读，可写或者在发生错误、提前关闭等事件的时候获得通知
 */

 const {
     Writable,
     Readable,
     Transform,
     finished
 } = require('stream')
 const assert = require('assert')
 const fs = require('fs')
 const { promisify } = require('util')

 {
     const rs = new Readable({
         read() {}
     })

     finished(rs, (err) => {
         console.log('one')
         assert(!err, 'no error')
     })

     rs.push(null)
     rs.resume()
 }
 
 {
     const ws = new Writable({
         write(data, enc, cb) {
             cb()
         }
     })

     finished(ws, (err) => {
         console.log('two')
         assert(!err, 'no error')
     })

     ws.end()
 }

 {
     const tr = new Transform({
         transform(data, enc, cb) {
             cb()
         }
     })

     let finish = false
     let ended = false

     tr.on('end', () => {
         ended = true
     })

     tr.on('finish', () => {
         finish = true
     })

     finished(tr, err => {
         console.log('three')
         assert(!err, 'no error')
         assert(finish)
         assert(ended)
     })

     tr.end()
     tr.resume()
 }

 {
     const rs = new Readable()

     finished(rs, err => {
         console.log(err instanceof Error)
         assert(err, 'should has an error')
     })

    //  触发close事件
    rs.emit('close')
    rs.push(null)
    rs.resume()
 }