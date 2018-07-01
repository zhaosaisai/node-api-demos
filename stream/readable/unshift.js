/**
 * readable.unshift([chunk])
 * 在非对象模式下，chunk可以是字符串，Buffer，或者Unit8Array。在对象模式下，chunk可以是除null之外的任意的
 * javascript变量。
 * 
 * 这个方法会把一块数据压入到Buffer内部。
 * 在end事件已经触发或者运行的错误抛出的时候，stream.unshift(chunk)方法将不能被调用
 * 
 * stream.unshift(chunk)在重置流的内部读取状态时是不会结束读取过程。
 * 如果在读取过程中调用 readable.unshift() 则会导致异常 (例如：即来自自定义流上的 stream._read()内部方法上的实现)。
 *  应该在调用 readable.unshift()方法之后适当调用 stream.push('') 来重置读取状态，
 * 执行读取的过程中最好避免调用 readable.unshift()方法。
 */

//  TODO: 深入理解

 const assert = require('assert')
 const { Readable } = require('stream')

 const expected = [
     'xxxxxxxxxx',
     'yyyyy',
     'xxxxxxxxxx',
     'yyyyy'
 ]

 let nChunks = 2
 const r = new Readable()
 const chunk = Buffer.alloc(10, 'x')
 const seen = []

 r._read = function(n) {
    setImmediate(() => {
        r.push(nChunks--  === 0 ? null : chunk)
    })
 }
 
 let readAll = false
 r.on('readable', () => {
    let chunk = null
    while(chunk = r.read()) {
        seen.push(chunk.toString())

        const pushBack = Buffer.alloc(readAll ? 0 : 5, 'y')
        readAll = !readAll
        r.unshift(pushBack)
    }
 })

 r.on('end', () => {
     assert.deepStrictEqual(seen, expected)
     console.log('over')
 })