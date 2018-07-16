/**
 * Buffer.allocUnsafe(size)
 * 这个方法主要是用于创建一个指定size的buffer。但是不会用初始的数据来填充它。
 * 
 * 以这种方式创建的buffer，底层的内存是未初始化的。新创建的buffer的内容是未知的，
 * 且可能会包含敏感数据。可以使用fill方法来填充数据
 */

 const buf = Buffer.allocUnsafe(10)
 console.log(buf)
 
//  用0来填充
 buf.fill(0)
 console.log(buf)
