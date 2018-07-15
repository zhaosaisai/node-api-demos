/**
 * 当新的事件监听器被添加的时候就会触发这个事件
 * 这个事件的回调函数接收两个参数，第一个参数就是要监听的事件的名称。第二个参数就是事件句柄函数。
 */

 const { EventEmitter } = require('events')

 const myEvent = new EventEmitter()

 myEvent.on('event', () => {
    console.log('first event is called')
 })

 myEvent.on('newListener', (eventName) => {
     if (eventName === 'event') {
         myEvent.emit(eventName)
     }
 })

 myEvent.on('event', () => {
     console.log('second event is called')
 })

 myEvent.emit('event')

