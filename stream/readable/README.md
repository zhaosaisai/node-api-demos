可读流是提供数据的源头

Nodejs中的可读流一般有以下几种：

- Http response, on the client
- Http requests, on the server
- fs read stream
- zlib streams
- crypto streams
- TCP sockets
- child process stdout and stderr
- process.stdin

所有的可读流都实现了stream.Readable类定义的接口

### 两种模式
可读流有两种模式：flowing和paused
### 三种状态