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