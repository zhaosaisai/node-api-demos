### stream

Nodejs提供了多种流对象。流是可写的，可读的或者是可读写的。所有的流都是EventEmitter的实例。

stream模块主要是为了让开发者创建新类型的流实例。对于以消费流为主的开发者而言，极少的需要直接使用stream模块。

- 流的基本类型
    在nodejs中主要有以下四种类型的流：
    - Writable - 可写入数据的流。(如fs.createWriteStream())
    - Readable - 可读取数据的流。(如fs.createReadStream())
    - Duplex - 可读又可写的流。(如net.Socket)
    - Transform - 在读写过程中可以修改和转换数据的Duplex流。(如zlib.createDeflate())

- 缓冲

    Writable 和 Readable流都会在内部的缓冲器中存储数据。我们可以通过writable.writeBuffer 和 readable.readBuffer来获取缓冲器中的数据。

    可缓冲的数据的大小取决于传递给流的highWaterMark属性的大小。对于普通的流而言，highWaterMark指定了字节的总大小。对于在对象模式中操作的流，highWaterMark指定了对象的总数目。

    当可读流的实现调用stream.push(chunk)的时候，数据会被缓冲。如果流的消费者没有调用stream.read()方法的时候，数据就会被缓冲在缓冲区中，直至数据被消费。

    当内部的可读缓冲的总大小达到highWaterMark指定的阈值的时候，流就会暂停从底层资源读取数据，直到当前缓冲器的数据被消费。

    当可写流反复的调用writable.write(chunk)方法的时候，数据就会被缓冲。当内部的可写的缓冲的数据的总大小小于hightWaterMark指定的阈值的时候，调用writable.write()方法就会返回true。一旦内部的缓冲区的数据的大小达到highWaterMark的时候，调用writable.write()会返回false

    Duplex和Transform都是可读可写的，所以它们各自维护着两个相互独立的内部缓冲器用于读取和写入，这使得它们在维护合理高效的数据流的同时，对于读取和写入两边可以同时进行而互不干扰。