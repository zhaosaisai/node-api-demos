/**
 * stat.isSymbolicLink()
 * 如果 fs.Stats 对象表示一个符号链接，则返回 true 。
 * 该方法只在使用 fs.lstat() 时有效。
 */

 const fs = require('fs')
 const assert = require('assert')
    
 const hardLinkFile = './index.js.hard'
 const softLinkFile = './index.js.soft'

 fs.lstat(softLinkFile, (err, stat) => {
     assert.ok(stat.isSymbolicLink())
 })