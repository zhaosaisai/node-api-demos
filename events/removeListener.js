/**
 * 当移除一个事件的时候就会出发removeListener事件
 */

 const { EventEmitter } = require('events')

 const myEvent = new EventEmitter()

 myEvent.on('event', () => {
     myEvent.removeAllListeners('event')
     console.log('event is fired')
 })

 myEvent.on('removeListener', (eventName) => {
     console.log(`${eventName} is removed`)
 })

 setTimeout(() => {
    myEvent.emit('event')
 }, 1000)