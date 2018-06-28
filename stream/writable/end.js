/**
 * writable.end([chunk], [encoding], [callback])
 *  chunk: 指定需要写的数据，在非对象模式下，chunk必须是Buffer, String, 或者Unit8Array。对象模式下chunk可以
 *      是任意的javascript数值，除了null。
 *  encoding：如果chunk是一个字符串的话，encoding主要是用来指定编码的
 *  callback：在流结束的时候的回调函数
 * 
 * 当我们调用这个方法的时候说明没有数据再写入到可写流中了。callback参数可以作为finish事件的回调函数，会和明确
 * 的finish事件回调函数一起被调用
 * 
 * 这个方法之后不能在调用writeable.write向writable中写入数据
 * 
 * writable._writableState.ended可以通过这个属性来查看可写流是否写入完成
 */
const assert = require('assert')
const stream = require('stream')

const writable = new stream.Writable({
    write(chunk, encoding, callback) {
        callback()
    }
})

assert.strictEqual(writable._writableState.ended, false)

writable.on('finish', () => {
    console.log('这个事件也会被触发')
})

writable.write('hello')
writable.end('world', () => {
    console.log('这个事件会触发')
    assert.strictEqual(writable._writableState.ended, true)
})


