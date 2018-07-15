/**
 * 返回正在监听名为 eventName 的事件的监听器的数量。
 */

 const { EventEmitter } = require('events')

 const myEvent = new EventEmitter()

 myEvent.on('e1', () => {})
 myEvent.on('e1', () => {})
 myEvent.on('e1', () => {})

 console.log(myEvent.listenerCount('e1'))