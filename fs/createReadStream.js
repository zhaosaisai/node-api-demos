/**
 * fs.createReadStream用于创建一个新的ReadStream对象
 * 这个方法接收两个参数
 * path：基于某个文件来创建可读流
 * options：创建可读流时候的一些选项
 *  flags：类似于打开文件的标识
 *  encoding：读取文件时候的编码格式
 *  fd：读取文件的标识符
 *  mode：读取文件的模式
 *  autuClose：读取完毕后是否自动关闭文件
 *  start：读取文件的开始的位置
 *  end：读取文件的时候的结束的位置
 *  highWaterMark: 设置缓冲区的大小 默认是64k的大小
 * 
 * 如果指定了fd参数，则这个方法就会忽略path所指定的文件
 * 这个时候就不会触发open事件
 * 
 * 如果autoClose为false，则文件描述符是不会自动关闭的
 * 即使有错误，我们也必须手动的来关闭文件
 * 
 * mode用于指定文件的模式，只会在创建文件的时候起作用
 * 
 * 如果options是一个字符串，则它表示的是字符编码
 * 
 * 这个方法的返回值是一个ReadStream对象，具体的例子可以参考ReadStream
 */

 const fs = require('fs')
 const file = require('path').resolve(__dirname, 'README.md')
 const fdFile = require('path').resolve(__dirname, 'access.js')

 const reader = fs.createReadStream(file, {
     encoding: 'utf8',
     start: 2,
     end: 4
 })

 reader.on('open', () => {
     console.log('文件打开了')
 })

 reader.on('data', (chunk) => {
     console.log(chunk)
 })

 reader.on('end', () => {
     console.log('读取文件结束')
 })

//  通过文件的标识符来读取文件
fs.open(fdFile, 'r' ,(err, fd) => {
    const reader = fs.createReadStream(file, {
        fd: fd,
        start: 100, 
        end: 110,
        encoding: 'utf8'
    })

    reader.on('open', () => {
        console.log('这个事件是不会被触发的')
    })

    reader.on('data', (chunk) => {
        console.log(chunk)        
    })
   
    reader.on('end', () => {
        console.log('读取文件结束')
    })
})
