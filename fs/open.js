/**
 * fs.open(path, flag[, mode], callback)
 * path:是需要被打开的文件的路径，如果指定的路径的文件不存在，则会创建对应的文件
 * flag：打开文件的时候的模式
 * mode：如果文件不存在，在某些情况下会创建这个文件，并设置这个文件的权限为mode指定的值
 * callback：文件被打开后会调用这个回调函数，第二个参数就是被打开的文件的标识符
 * 
 * 对于带有x标志的flag，如果指定的path的文件已经存在，则会在可写模式下打开失败。
 */
 const fs = require('fs')
 const path = require('path')
 const assert = require('assert')
 
 let caughtException = false;

 try {
     // should throw ENOENT, not EBADF
     fs.openSync('/path/to/file/that/does/not/exist', 'r')
 } catch (e) {
    assert.strictEqual(e.code, 'ENOENT')
    caughtException = true
 }

 assert.strictEqual(caughtException, true)

 fs.open(__dirname, 'r', (err, fd) => {
     assert.ifError(err)
     assert.ok(typeof fd === 'number')
 })

 fs.open(__dirname, 'rs', (err, fd) => {
    assert.ifError(err)
    assert.ok(typeof fd === 'number')
 })