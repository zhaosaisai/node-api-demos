/**
 * path.join([...paths])
 * 这个方法主要是使用系统的路径分隔符把一系列路径连接起来，生成规范化的路径
 * 
 * 返回的可能是绝对路径也可能是是相对路径
 */

 const path = require('path')

 console.log(path.join('../index', './abc'))
 console.log(path.join('../index', '/abc'))