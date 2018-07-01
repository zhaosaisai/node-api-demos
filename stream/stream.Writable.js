/**
 * stream.Writable([options])
 * 主要是用于实现自定义的可写流，自定义的可写流必须实现writable._write()方法
 * 也可以实现writable._writev()方法
 * 
 * options选项可以有如下的属性：
 *  highWaterMark：用于定义缓冲大小的值。如果缓冲的数据的大小已经超过了这个选项设定的值，调用writable.write()
 *      方法会返回false。默认是16kb，objectMode流默认是16
 *  decodeStrings：在调用writable.write方法将数据写入缓冲区之前是否需要解码字符串。默认是true
 *  objectMode：是否支持写入对象
 *  write：writable._write方法的实现
 *  writev：writable._writev方法的实现
 *  final：writable._final方法的实现
 *  destroy：writable._destroy方法的实现
 */

 /**
  * writable._write(chunk, enc, callback)
  * 这个方法必须在自己实现可写流的时候重新定义。这个方法的主要作用就是将数据发送到底层的资源。
  * 这个方法接收三个参数，第一个参数就是要写入的数据，
  * 第二个参数就是写入数据的编码，第三个参数就是在数据写入完成时候的回调函数。
  * 
  * callback必须被调用，用来表示调用的成功与否。如果调用出错，则第一个参数必须是一个error实例，否则是null。
  * 如果在构造函数选项中设置decodeStrings属性，那么chunk可能是一个字符串而不是一个缓冲区，encodeing将会表示字符串的字符编码。
  */

  /**
   * writable._writev(chunks, callback)
   *    chunks：表示的是要写入的块，每一个块都有如下的格式：{chunk:..., encoding:....}
   *    callback：一个回调函数，表示在提供的块被处理完成时被调用
   * 
   * writable._writev()方法能够一次处理多个数据块的流除了writable._write()之外。如果实现，该方法将缓存的所有数据块写入队列
   */

   /**
    * writable._destroy(err, callback)
    *   err: 错误
    *   callback：错误发生时候的回调函数
    * 通过 writable.destroy() 方法调用_destroy()。它可以被子类覆盖，但不能直接调用。
    */

    /**
     * writable._final(callback)
     *   callback：在完成写入所有剩余数据时调用该函数（err参数可选）。
     * 这个可选的函数将在流关闭之前被调用, 直到callback回调函数执行完成才触发finish事件。这对于关闭资源或在流结束之前写入缓冲数据很有用。
     */

 const assert = require('assert')
 const { Writable } = require('stream')

 const w = new Writable()
 
 //  所有的可写流必须实现一个_write方法，如果没有实现的话，会报错
 w.on('error', err => {
     assert.ok(err, 'no error')
     assert.strictEqual(err.message, 'The _write() method is not implemented')
 })

 w.end(Buffer.from('hello'))

 const _write = (data, enc, cb) => {
     cb()
 }

 const _writev = (data, cb) => {
    // console.log(data)
    assert.strictEqual(data.length, 2)
    cb()
 }

 let shutdown = false

 const w2 = new Writable({
     write: _write,
     writev: _writev,
     final(cb) {
        setTimeout(() => {
            shutdown = true;
            console.log('流即将被关闭')
            cb();
        }, 100);
     }
 })

 assert.strictEqual(w2._write, _write)
 assert.strictEqual(w2._writev, _writev)

 w2.write(Buffer.from('hello'))
 
 w2.cork()
 w2.write(Buffer.from('hello2'))
 w2.write(Buffer.from('hello3'))

 w2.end()

 w2.on('finish', () => {
     console.log('流被关闭了')
     assert(shutdown)
 })