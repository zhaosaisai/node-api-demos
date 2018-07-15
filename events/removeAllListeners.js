/**
 * emitter.removeAllListeners([eventName])
 * 
 * 移除全部或指定 eventName 的监听器。
 * 
 * 与此一样的是emitter.removeListener(eventName, listener)
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

myEvent.removeAllListeners('event')
myEvent.emit('event')