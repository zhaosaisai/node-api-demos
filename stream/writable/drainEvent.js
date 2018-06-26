/**
 * 当我们调用write方法向可写流中写入数据的时候，如果write方法的返回值是false，说明可写流的缓冲区已经
 * 达到了最大值，这个时候是无法将数据写入到流中的，当缓冲区中的数据被消费，同时流恢复数据可写的时候会触发
 * drain事件
 */

 const fs = require('fs')
 let ok = true
 let MAX = 1000000 

 function write(writer, data = 'h' ,encoding = 'utf8', callback = () => {
     console.log('数据写入完毕')
 }) {
     while(ok && MAX > 0) {
         MAX--
         if (MAX === 0) {
             writer.write(data, encoding, callback)
         } else {
            ok = writer.write(data)
         }
         if (ok === false) {
             console.log(MAX)
         }
     }

     if (MAX > 0) {
        writer.once('drain', () => {
            write(writer)
            console.log(writer.writable)
         })
     }
 }

 const writer = fs.createWriteStream('./drain.txt')

 write(writer)