/**
 * 返回名为 eventName 的事件的监听器数组的副本。
 */
 const { EventEmitter } = require('events')

 const myEvent = new EventEmitter()

 myEvent.on('e1', () => {
     console.log(1)
 })
 myEvent.on('e1', () => {
    console.log(2)
 })
 myEvent.on('e1', () => {
    console.log(3)
 })

 const listeners = myEvent.listeners('e1')

 listeners.forEach(fn => fn())