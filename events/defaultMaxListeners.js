/**
 * EventEmitter.defaultMaxListeners指定了每个事件最多可以注册的监听器的数目，默认是10个。
 * 设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有 EventEmitter 实例，包括之前创建的。 
 *  因而，调用 emitter.setMaxListeners(n) 优先于 EventEmitter.defaultMaxListeners。
 */

 const { EventEmitter } = require('events')

 EventEmitter.defaultMaxListeners = 1

 const myEvent = new EventEmitter()

 myEvent.on('event', () => {
     console.log('first')
 })

 myEvent.on('event', () => {
     console.log('second')
 })