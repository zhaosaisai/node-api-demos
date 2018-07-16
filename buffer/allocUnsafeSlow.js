/**
 * Buffer.allocUnsafeSlow(size)
 * 这个方法也是用于创建一个指定大小的buffer。
 * 
 * 当使用 Buffer.allocUnsafe() 分配新建的 Buffer 时，当分配的内存小于 4KB 时，默认会从一个单一的预分配的 Buffer 切割出来。 
 * 这使得应用程序可以避免垃圾回收机制因创建太多独立分配的 Buffer 实例而过度使用。 
 * 这个方法通过像大多数持久对象一样消除追踪与清理的需求，改善了性能与内存使用。
 */