/**
 * writable.writableLength
 * 这个属性返回写入缓冲队列中的字节的数目
 */
const stream = require('stream')

const writable = new stream.Writable()

console.log(writable.writableLength)