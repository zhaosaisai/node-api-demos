/**
 * path.parse(path)
 * path.parse() 方法返回一个对象，对象的属性表示 path 的元素
 */

 const path = require('path')

 const pathObj = path.parse(__filename)

 for (let attr in pathObj) {
     console.log(`${attr} ===> ${pathObj[attr]}`)
 }