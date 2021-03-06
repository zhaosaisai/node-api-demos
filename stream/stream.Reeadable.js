/**
 * stream.Readable主要是用来实现并扩展Readable的
 * 
 * 如果我们想实现自己的可读流，必须实现的方法是 _read方法
 * 
 * 实现可读流的方式之一：
 * new stream.Readable([options])
 *  options可以有如下的几个选项：
 *      highWaterMark：从底层资源读取数据并存储在内部缓冲区中的最大的字节数。默认是16kb，或者16对应objectMode模式
 *      encoding：指定解析读取数据时候所使用的字符编码
 *      objectMode：是否允许直接读取对象，而不是字节的缓冲区。默认是false
 *      read：对stream._read方法的实现
 *      destroy：对stream._destroy方法的实现
 */

 /**
  * readable._read(size)
  *     size：异步读取的字节数
  * 这个方法在创建自定义的可读流的时候是必须要实现的一个方法。应该由子类实现，并且在Readable对象的内部使用。
  * 当readable._read()被调用，如果读取的数据是可用的，应该在最开始的实现的时候使用this.push(dataChunk)
  * 方法将数据推入读取队列中。
  * 
  * 注意：一旦readable._read()方法被调用，只有在 readable.push()方法被调用之后，才能再次被调用。
  * 
  * 当我们向缓冲区 push 一个 null 就停止了可读流对数据的缓存。
  */

  /**
   * readable._destroy(err, callback)
   * 这个方法主要用于销毁可读流，这个方法可以通过readable.destroy()方法调用，也可以被子类覆盖，但是不能被
   * 直接调用。
   */

   /**
    * readable.push(chunk, encoding)
    * 这个方法主要是向可读流的缓冲区中存入数据。如果数据存入缓冲区成功则返回true，失败则返回false。
    * 当可读流处在传输模式下，'data'事件触发时，可以通过 调用readable.read() 方法读出来数据，这数据是用readable.push()添加的。
    */

  const { Readable } = require('stream')
  const assert = require('assert')

  const error = new Error('自定义错误')

  class MyReadable extends Readable{
      constructor(options) {
          super(options)
          this.max = options.max || 10
          this.timer = null
      }

      _read() {
          this.timer = setTimeout(() => {
            if (this.max) {
                this.push(`${this.max}推送`)
                // 随机产生错误
                if (Math.random() < 0.5) {
                    this.destroy(error)
                }
                this.max--
            } else {
                this.push(null)
            }
          }, 50)
      }

      _destroy(err, cb) {
            assert.strictEqual(err, error)
            // 这样才能触发error事件
            cb(err)
      }
  }

  const r = new MyReadable({
      max: 20
  })

  r.on('readable', () => {
      const chunk = r.read()
      if (chunk) {
        console.log(`Got the data ${chunk.toString()}`)
      }
  })

  r.on('end', () => {
      console.log('读取结束')
      clearTimeout(r.timer)
  })

  r.on('error', () => {
      console.log('读取出错')
      clearTimeout(r.timer)
  })