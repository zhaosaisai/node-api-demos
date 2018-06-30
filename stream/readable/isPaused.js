/**
 * readable.isPaused()
 * 返回当前可读流的操作状态，这个方法主要是在pipe方法的底层使用。一般很少的直接使用这个方法
 */
const Readable = require('stream').Readable
const assert = require('assert')

const r = new Readable()
assert.strictEqual(r.isPaused(), false)
r.pause()
assert.strictEqual(r.isPaused(), true)