/**
 * fs.mkdtemp(prefix[, options], callback)
 * 这个方法用来创建一个临时的目录
 * 创建的目录路径会作为回调函数的第二个参数
 * 
 * prefix应该以平台的路径分隔符结尾，可以利用这个参数在指定的目录下面创建临时目录
 * 
 * 生成六位随机字符附加到一个要求的 prefix 后面，然后创建一个唯一的临时目录。
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const seq = path.sep

fs.mkdtemp(`${__dirname}/tmp${seq}`, (err, tmp) => {
    assert.ifError(err)

    console.log(`你创建的临时目录是：${tmp}`)
    // 删除这个临时的目录
    // fs.rmdirSync(tmp)
})