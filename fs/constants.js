/**
 * fs.constants包含了文件操作的各种数值常量
 */

 const fs = require('fs')

 for (let constant in fs.constants) {
     console.log(`constant's name is ${constant} => ${fs.constants[constant]}`)
 }