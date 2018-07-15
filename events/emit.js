/**
 * emit(eventName, [...args])
 * 按照事件的注册顺序，同步的调用每个注册到名为eventName事件的监听器
 * 
 * 如果注册了事件监听器，则返回true，否则会返回false
 */

 const { EventEmitter } = require('events')

 const myEvent = new EventEmitter()

 myEvent.on('event1', (...args) => {
     console.log(args)
 })

 myEvent.on('event2', () => {})

 console.log(myEvent.emit('event1', 'one', 'two'))
 console.log(myEvent.emit('event2', 'one', 'two'))