/**
 * readable.destroy([error])
 * 这个方法主要用于销毁流并抛出error，触发error事件。然后，可读流将释放所有的内部资源。
 * 
 * 开发者不应该覆盖这个方法，应该使用_destroy方法
 */
const assert = require('assert')
const { Readable } = require('stream')
const { inherits } = require('util')

{
    const r = new Readable({
        read() {
            console.log('开始读取数据one')
        }
    })

    r.resume()

    r.on('close', () => {
        console.log('one 读取结束')
    })

    r.destroy()
    assert.strictEqual(r.destroyed, true)
}

{
    // 抛出一个错误
    const r = new Readable({
        read() {
            console.log('开始读取数据two')
        }
    })

    const error = new Error('two is error')

    r.on('close', () => {
        console.log('two is closed')
    })

    r.on('end', () => {
        console.log('two is ended')
    })

    r.on('error', err => {
        console.log(err.message)
        assert.strictEqual(err, error)
    })

    r.resume()
    r.destroy(error)
    assert.strictEqual(r.destroyed, true)
}

{
    // 重写destroy
    const r = new Readable({
        read() {
            console.log('开始读取数据three')
        }
    })

    const error = new Error('three is error')

    r._destroy = function(err, cb) {
        assert.strictEqual(err, error)
        console.log(err.message)
        // 不把error传递到回调函数是不会触发error事件的,同时也会去读取流中的内容
        cb(null)
        // 会触发error事件
        // cb(err)
    }

    r.on('close', () => {
        console.log('three is closed')
    })

    r.on('end', () => {
        console.log('three is ended')
    })

    r.on('error', err => {
        console.log(err.message)
        assert.strictEqual(err, error)
    })

    r.resume()
    r.destroy(error)
    assert.strictEqual(r.destroyed, true)
}