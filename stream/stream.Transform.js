/**
 * Transform流是Duplex流的一种。输入可以通过Transform流，然后经过某种计算再输出对应的数据。
 * 
 * 实现自己的转换流，必须要实现_transform方法，而_flush方法并不是必须实现的。
 * 
 * new stream.Transform(options)
 *  options可以接收如下两个选项
 *      transform: 对_transform方法的实现
 *      flush: 对_flush方法的实现
 * 
 * 这个流会触发两个事件：finish事件和end事件
 * 在调用了transform.end()和transform._transform()后会触发这个事件
 * transform._flush()中的回调函数被调用后，所有的数据已经输出，这个时候会触发end事件。
 */

 /**
  * transform._flush(callback)
  * 当transform流中的数据被消耗完毕后会调用其中的回调函数
  */

/**
 * transform._transform(chunk, encoding, callback)
 *  chunk: 被转换的数据块。它总是一个buffer除非在option中配置decodeString为false或者当前流处在object mode下。
 *  encoding: 如果 chunk 是字符串，那么encoding就是该字符串的字符编码。如果块是Buffer，它是一个特殊的值'buffer',这种情况encoding可以被忽略。
 *  callback: 当块被处理完成时调用此函数（包含error和data参数）。
 * 
 * transform._transform()的实现会处理写入的字节，做某种计算并输出，然后使用readable.push()方法把这个输出传递到可读流。
 * 
 * callback 会在当前数据被完全消费之后调用。在处理过程输入的过程中如果出错了,第一个参数是一个错误对象，没有出错Error参数则为null。如果传递第二个参数，它会被转发到readable.push()中。
 */
const { Transform } = require('stream')
const assert = require('assert')

{
    const transform = new Transform()

    transform.on('error', err => {
        console.log('出错了')
        assert.strictEqual(err.message, 'The _transform() method is not implemented')
    })

    transform.end(Buffer.from('hello world'))
}
{
    // 实现一个输入小写字母输出大写字母的转换流
    class MyTransform extends Transform {
        constructor(options = {}) {
            super(options)
            this.cache = options.cache || []
        }
        _transform(chunk, enc = 'utf8', callback) {
            chunk = String(chunk)
            this.cache.push(chunk)
            this.push(chunk.toUpperCase())
            callback()
        }
        _flush(cb) {
            console.log('end之前被调用')
            console.log(this.cache)
            // 不调用这个是不会触发end事件的
            cb()
        }
    }

    const t = new MyTransform({
        encoding: 'utf8'
    })

    t.write('hello')
    t.write('world')
    t.end('transform')

    t.on('data', chunk => {
        console.log(chunk)
    })

    t.on('end', () => {
        console.log('数据读取结束')
    })

    t.on('finish', () => {
        console.log('数据写入结束')
    })
}