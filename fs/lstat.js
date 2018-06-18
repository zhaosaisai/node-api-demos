/**
 * fs.lstat(path, callback)
 * 这个方法和fs.stat的方法相同，只有在path所指向的文件是一个链接文件的时候，这个方法就是指
 * 这个链接，而不是链接所指的源文件
 */
const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, 'futimes.txt')
const linkFile = path.resolve(__dirname, 'futimes-link.txt')

fs.stat(file, (err, stat) => {
    console.log(stat)
})

fs.stat(linkFile, (err, stat) => {
    console.log(stat)
})

fs.lstat(file, (err, stat) => {
    console.log(stat)
})

fs.lstat(linkFile, (err, stat) => {
    console.log(stat)
})