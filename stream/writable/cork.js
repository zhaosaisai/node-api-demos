/**
 * writable.cork()这个方法将强制将所有缓冲的数据放到内存缓冲区中。直到调用stream.uncork()或stream.end()
 * 方法的时候缓冲区中的数据才会被输出。
 * 
 * 因为，当我们向流中写入大量小数据的时候，内部缓冲区可能会失效，导致性能下降。这个方法就是用来避免这种情况的
 * 。对于这种情况，实现了writable._writev()方法的流可以对数据进行缓冲，从而提高效率。
 * 
 * writable._writableState.bufferedRequestCount属性可以用来表示缓冲池中缓冲的结点的数量
 * writable._writableState.bufferedRequest缓冲池中的头结点
 * writable._writableState.lastBufferedRequest缓冲池中的尾结点
 * 
 * writable._writableState.corked是cork的标识，也可以理解成cork被调用的次数 
 */
const assert = require('assert')
const stream = require('stream')

const writable = new stream.Writable()

writable._writev = (chunks, cb) => {
    assert.strictEqual(chunks.length, 2)
    cb && cb()
}

writable._write = (chunks, encoding, cb) => {
    cb && cb()
}

// first cork

 