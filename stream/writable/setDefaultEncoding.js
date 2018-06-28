/**
 * writable.setDefaultEncoding(encoding)
 * 用来设置可写流的编码格式
 */
const assert = require('assert')
const stream = require('stream')

class MyWrite extends stream.Writable {
    constructor(fn, options) {
        super(options)
        this.fn = fn
    }

    // 重写write方法
    _write(chunk, encoding, callback) {
        this.fn(Buffer.isBuffer(chunk), typeof chunk, encoding)
        callback()
    }
}

const options = {
    decodeStrings: false
}

const writable1 = new MyWrite((isBuffer, type, encoding) => {
    console.log('Check writable1')
    assert.strictEqual(isBuffer, false)
    assert.strictEqual(type, 'string')
    assert.strictEqual(encoding, 'utf8')
}, options)

writable1.write('hello')
writable1.end()

const writable2 = new MyWrite((isBuffer, type, encoding) => {
    console.log('Check writable2')
    assert.strictEqual(isBuffer, false)
    assert.strictEqual(type, 'string')
    assert.strictEqual(encoding, 'ascii')
}, options)

// 设置writable2的字符编码
writable2.setDefaultEncoding('ascii')

writable2.write('hello')
writable2.end()