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

在flowing模式下，数据自动的从底层进行读取，并通过EventEmitter接口事件尽可能的通知到应用程序
在paused模式下，必须显示的调用stream.read()方法从流中读取数据片段

所有的可读流，最初的时候都是paused模式的，可以通过如下的方式切换到flowing模式下：

- 新增一个data事件处理函数
- 调用stream.resume()方法
- 调用pipe方法将数据发送到可写流

对于处于flowing模式下的可读流也可以通过如下方式切回到paused模式下：

- 如果没有管道目标则调用stream.pause()方法
- 如果有管道目标，移除所有的管道目标。调用stream.pipe()方法可以移除多个管道目标。

有一点很重要就是只有提供了消费或者忽略的机制后，可读流才会产生数据。如果消费的机制被暂停或者移除，则可读流会停止产生数据。

如果可读流处于flowing模式下，但是这些数据没有被消费函数处理，那么这部分数据会丢失。
比如，当我们调用stream.resume()但是不存在data事件处理函数或者事件监听器，这部分数据就会被丢失。

### 三种状态

在任意的时刻，任一可读流都会处于一下三种模式中：

- readable.readableFlowing = null

当为null的时候，表示没有提供数据消费机制，所以流是不会产生数据的。在这种状态下，如果我们设置data监听函数，调用stream.pipe或者stream.resume()方法的时候，readable.readableFlowing的值就会变为true，可读流就会开始主动的产生数据并触发事件。

- readable.readableFlowing = false

当readableFlowing的值为true的时候，如果我们调用readable.pause()或者readable.unpipe()方法的时候，readableFlowing的值就会变为false。暂时停止事件流但是不会停止数据的生成。在这种状态下，我们为data事件设置事件监听器并不会将readableFlowing变为true。

- readable.readableFlowing = true

```js
const { PassThrought, Writable } = require('stream')
const pass = new PassThrought()
const write = new Writable()

// pass.readableFlowing为null
pass.pipe(write)
pass.unpipe()

// pass.readableFlowing为false

pass.on('data', chunk => console.log(chunk))
// 不会触发data事件
pass.write('hello')
// 下面这种操作才会触发data事件
pass.resume()

// 也就是说当readableFlowing为false的时候，我们需要将其显示的设置为true，才会生成新的数据。
```

对于大多数用户，建议使用 readable.pipe() 方法来消费流数据，因为它是最简单的一种实现。开发者如果要精细地控制数据传递和产生的过程，可以使用 EventEmitter 和 readable.pause()/readable.resume() 提供的 API 。