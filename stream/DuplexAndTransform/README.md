Duplex是同时实现了可读和可写接口的双工流，主要包含了如下几种：

- TCP Sockets
- zlib Streams
- crypto streams

Transform称为变换流，也是一种双工流。它的输出和输入是通过某种方式进行关联的。和所有的双工流一样，变换流同时实现了可读和可写的接口。主要有如下几种：

- zlib streams
- crypto streams