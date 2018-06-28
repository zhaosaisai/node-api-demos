/**
 * writable.destroy([error])
 * 摧毁这个流，并发出传过来的错误。当这个方法被调用后，这个流就结束了。
 */
const assert = require('assert')
const { Writable } = require('stream')
const { inherits } = require('util')

{
    const writable = new Writable({
        write(chunk, enc, cb) {
            cb()
        }
    })

    writable._name = 'first'

    writable.on('finish', () => {
        console.log(`${writable._name} is finished`)
    })

    writable.on('close', () => {
        console.log(`${writable._name} is closed`)
    })

    writable.destroy()
    assert.strictEqual(writable.destroyed, true)
}

{
    const writable = new Writable({
        write(chunk, enc, cb) {
            cb()
        }
    })

    writable._name = 'second'
    
    const error = new Error('writable is errored')
    writable.on('finish', () => {
        console.log(`${writable._name} is finished`)
    })

    writable.on('close', () => {
        console.log(`${writable._name} is closed`)
    })

    writable.on('error', err => {
        console.log(`${writable._name} is errored`)
        assert.strictEqual(err, error)
        assert.strictEqual(err.message, 'writable is errored')
    })

    writable.destroy(error)
    assert.strictEqual(writable.destroyed, true)
}

// 重写writable._destroy方法
{
    const writable = new Writable({
        write(chunk, enc, cb) {
            cb()
        }
    })
    const error = new Error('writable is errored')

    // 重写_destroy方法
    writable._destroy = (err, cb) => {
        console.log('Error in _destroy')
        assert.strictEqual(err, error)
        assert.strictEqual(err.message, 'writable is errored')
        // 故意设置为null，这样就能看出这个方法被重写的作用
        // cb(null) //如果传递的参数是null，则error事件是不会被触发的
        cb(err)
    }

    writable._name = 'third'
    
    writable.on('finish', () => {
        console.log(`${writable._name} is finished`)
    })

    writable.on('close', () => {
        console.log(`${writable._name} is closed`)
    })

    writable.on('error', (err) => {
        console.log(`${writable._name} is errored`)
        // assert.strictEqual(err, null)
    })

    writable.destroy(error)
    assert.strictEqual(writable.destroyed, true)
}

{
    // 在创建流的时候传递自定义的destroy方法
    const writable = new Writable({
        write(chunk, enc, cb) {
            cb()
        },
        destroy(err, cb) {
            console.log('Error in fourth destroy')
            assert.strictEqual(err, error)
            // 下面这样调用是不会触发error事件
            cb()
            // 下面这样的调用会触发error事件
            // cb(err)
        }
    })
    const error = new Error('writable is errored')

    writable.on('close', () => {
        console.log('fourth is closed')
    })

    writable.on('finish', () => {
        console.log('fourth is finished')
    })

    writable.on('error', () => {
        console.log('error in fourth')
    })

    writable.destroy(error)
    assert.strictEqual(writable.destroyed, true)
}

{
    // 给destroy传递一个回调函数
    const writable = new Writable({
        write(chunk, enc, cb) {
            cb()
        }
    })

    const error = new Error('writable is errored')

    writable.on('error', () => {
        console.log('error in fifth')
    })

    // 如果设定了回调函数，是不会触发error事件的
    writable.destroy(error, (err) => {
        console.log('error in callback')
        assert.strictEqual(err, error)
        assert.strictEqual(writable.destroyed, true)
    })
    assert.strictEqual(writable.destroyed, true)
}

{
    // 延迟执行我们的错误回调
    const writable = new Writable({
        write(chunk, enc, cb) {
            cb()
        }
    })

    const error = new Error('error')

    writable._destroy = function(err, cb) {
        console.log('error in _destroy six')
        assert.strictEqual(err, error)
        process.nextTick(() => {
            this.end()
            cb()
        })
    }

    const fail = () => {
        console.log('callback is not invoked')
    }

    writable.on('finish', fail)

    writable.destroy(error)

    writable.removeListener('finish', fail)
    writable.on('finish', () => {
        console.log('finish is invoked')
    })

    assert.strictEqual(writable.destroyed, true)
}