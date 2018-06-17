/**
 * fs.chmod(path, mode, callback)
 * 这个方法主要用于异步的更新文件权限
 * path：需要更新权限的文件的路径
 * mode：文件需要被更新的权限
 * callback：权限更新成功后的回调函数，如果更新成功，则第一个参数非null
 */

 const fs = require('fs')
 const assert = require('assert')
 const path = require('path')

 const file1 = path.join(__dirname, 'chmod1.txt')
 const file2 = path.join(__dirname, 'chmod2.txt')
 const mode_async = 0o777 // 所有权限
 const mode_sync = 0o644 // 读写/读/读权限
 
 //  创建文件
 function createFile(path) {
    fs.closeSync(fs.openSync(path, 'w'))
 }

//  创建file1
createFile(file1)

// 改变file1的权限
fs.chmod(file1, mode_async.toString(8), (err) => {
    assert.ifError(err)

    assert.strictEqual(mode_async, fs.statSync(file1).mode & 0o777)

    fs.chmodSync(file1, mode_sync)
    console.log(fs.statSync(file1).mode)
    assert.strictEqual(fs.statSync(file1).mode & 0o777, mode_sync)
})

