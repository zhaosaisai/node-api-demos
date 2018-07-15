/**
 * event.prependOnceListener(eventName, listener)
 * 
 * 添加一个单次 listener 函数到名为 eventName 的事件的监听器数组的开头。 下次触发 eventName 事件时，监听器会被移除，然后调用。
 */

const { EventEmitter } = require('events')

const myEvent = new EventEmitter()

myEvent.on('event', () => {
    console.log('first')
})

myEvent.on('event', () => {
   console.log('second')
})

myEvent.emit('event')

myEvent.prependOnceListener('event', () => {
   console.log('last')
})

myEvent.emit('event')
myEvent.emit('event')