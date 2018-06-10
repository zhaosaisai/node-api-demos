当我们调用`fs.watch`方法的时候会返回一个新的`fs.FSWatcher`对象。
所有的`fs.FSWatcher`对象在被监视的文件改变的时候会触发`change事件`

