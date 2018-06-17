/**
 * 判断指定路径的文件是否存在，其异步版本fs.exists接口已经废弃
 */
const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, './existsSync.js')
const nonExistsFile = path.resolve(__dirname, './nonExistsSync.js')

console.log(fs.existsSync(file))
console.log(fs.existsSync(nonExistsFile))