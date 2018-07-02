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
