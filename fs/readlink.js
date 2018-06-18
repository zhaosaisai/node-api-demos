/**
 * fs.readlink(path, options, callback)
 * 使用异步的方式来读取链接的内容
 * 这个方法的回调函数的第二个参数就是linkString返回的链接字符串
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, 'futimes-link.txt')

fs.readFile(file, 'utf8', (err, data) => {
    // 返回的是链接文件所指向的文件的真实的内容
    console.log(data)
})

fs.readlink(file, 'utf8', (err, data) => {
    // 返回的是链接文件所指向的真实文件的路径
    console.log(data)
})