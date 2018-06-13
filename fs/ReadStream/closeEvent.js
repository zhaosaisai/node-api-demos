/**
 * 当fs.ReadStream底层的文件描述符被关闭的时候触发
 */
const fs = require('fs')
const path = require('path')

const file = fs.createReadStream(path.resolve(__dirname, './baidu.txt'))

file.on('close', () => {
    console.log('File closed', file.closed)
})

file.on('end', () => {
    file.close()
})

file.resume()