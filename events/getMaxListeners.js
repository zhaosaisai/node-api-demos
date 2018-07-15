/**
 * event.getMaxListeners()
 * 获取事件监听器的最大限制
 */

 const { EventEmitter } = require('events')

 EventEmitter.defaultMaxListeners = 5

 const e1 = new EventEmitter()

 console.log(e1.getMaxListeners())

 const e2 = new EventEmitter()
 e2.setMaxListeners(10)

 console.log(e2.getMaxListeners())