/**
 * readable.resume()
 * 这个方法可以将暂停模式的流切换到flowing模式，并重新触发data事件
 */

 const fs = require('fs')
 const assert = require('assert')
 
 const r = fs.createReadStream('./end.ss')

 assert.strictEqual(r.isPaused(), false)
 
//  如果不暂停流，data事件会被立即触发
 r.pause()
 assert.strictEqual(r.isPaused(), true)

 r.on('data', chunk => {
     console.log(chunk.toString())
     assert.strictEqual(r.isPaused(), false)
 })

 setTimeout(() => {
     console.log('data事件即将会被触发')
     r.resume()
 }, 5000)