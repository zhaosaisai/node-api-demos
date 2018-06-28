/**
 * writable.write(chunk, [encoding], [callback])
 * 这个方法主要是用于向可写流中写入数据的
 *  chunk：在非对象模式下，chunk可以是字符串，buffer，unit8Array中的一种。在对象模式下，chunk可以是非null的任何数据值
 *  encoding：指定写入数据的编码格式
 *  callback：缓冲数据输出时候的回调函数
 * 并在数据处理完成后调用 callback 。如果有错误发生， 
 * callback 不一定 以这个错误作为第一个参数并被调用。要确保可靠地检测到写入错误，应该监听 'error' 事件。
 * 
 * 在确认了chunk之后，如果内部缓冲区的大小小于创建流时设定的highWaterMark的值，则返回true
 * 如果返回false，则需要停止写入数据，直到drain事件被触发
 * 
 * 在write方法返回false的之后，仍然可以继续调用write方法向流中写入数据。这个时候nodejs会无条件的接收这些数据
 * 存入操作系统的内存中，直至系统内存被全部占用并强制结束。
 */

//  例子请参考 drainEvent.js 文件