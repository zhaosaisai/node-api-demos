/**
 * fs.fchmod(fd, mode, callback)
 * 这个方法和fs.chmod的作用一样，主要就是用于更改文件的权限的
 * 但是最主要的区别就是这个方法的第一个参数只能是一个已经被打开的文件的描述符
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

function createFile(path) {
    fs.closeSync(fs.openSync(path, 'w'))
}

const file = path.resolve(__dirname, 'fchmod.txt')

createFile(file)

fs.open(file, 'r', (err, fd) => {
    fs.fchmod(fd, 0o777, (err) => {
        assert.ifError(err)
        console.log('文件权限更改成功')
    })
})