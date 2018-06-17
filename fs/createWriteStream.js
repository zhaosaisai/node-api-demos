/**
 * fs.createWriteStream(path, [options])
 * 这个方法主要是用于创建一个可写流，返回的是一个WriteStream对象
 * path：就是表示用于创建可写流的文件的路径
 * options：在创建可写流的时候的一些基本选项
 *  flags：
 *  encoding：创建可写流的编码
 *  fd：基于某个已经被打开的文件来创建可写流
 *  mode：创建文件时候的，指定文件的mode
 *  autoClose：在可写流结束的时候是否需要自动关闭打开的文件
 *  start：写入内容时候的位置
 */
const fs = require('fs')

const file = require('path').resolve(__dirname, 'createWriteStream.txt')

const writer = fs.createWriteStream(file, {
    // start: 10
    autoClose: true
})

writer.on('close', () => {
    console.log('文件写入完毕')
    console.log(writer.closed)
})

writer.write('Hello World\n')

// 关闭写入流 和 autoClose不是一回事
writer.close()