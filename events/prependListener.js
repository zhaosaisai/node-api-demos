/**
 * event.prependListener(eventName, ;istener)
 * 
 * 这个方法用于将事件添加到事件监听器数组的开头
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

myEvent.prependListener('event', () => {
    console.log('last')
})

myEvent.emit('event')