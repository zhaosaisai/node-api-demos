/**
 * writable.writableLength
 * 这个属性返回写入缓冲队列中的字节的数目
 * 
 * node9版本以上才有
 */
const fs = require('fs')

const writable = fs.createWriteStream('./pipe.txt')

console.log(writable.writableLength) //0

writable.write('hello')

console.log(writable.writableLength) // 5