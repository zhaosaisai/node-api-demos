/**
 * readable.read([size])
 *  这个方法主要用于从可读流中读取指定字节的数据。如果没有可读的数据则返回true。
 *  这个方法默认会将读取的数据以buffer的形式进行返回，如果我们明确的通过readable.setEncoding方法
 *  设置了编码或者流的编码，则会输出相应编码的内容。
 *  
 *  如果我们没有明确的指定size参数，则内部缓冲区包含的数据都将被返回。
 * 
 *  readable.read()应该只在暂停模式下的可读流上运行。在流模式下，readable.read()会被自动调用直到内部
 *  缓冲区的数据被完全耗尽。
 * 
 *  一般这个方法和readable事件配合使用
 * 注意：如果readable.read()方法返回一个数据块，那么一个'data'事件也将被发送。
 */

 const fs = require('fs')

 const r = fs.createReadStream('./end.ss')

 //  暂停流
 r.pause()
 
 r.setEncoding('utf8')
 r.on('data', chunk => {
     console.log(chunk.toString())
 })

 console.log(r._readableState.ended)
 console.log(r.bytesRead)

 r.on('readable', () => {
    console.log('内容可读')
    let data = null
    while(data = r.read(3)) {
        console.log('读取的内容是：', data)
    }
 })
