/**
 * fs.mkdir(path, mode, callback)
 * 这个是异步创建文件夹的方法
 * 
 * 如果创建的文件夹已经存在的话，则会报错
 */

 const fs = require('fs')
 const path = require('path')
 const assert = require('assert')

 const dir = path.resolve(__dirname, 'dirs')

//  创建一个文件夹
fs.mkdir(dir, 0o666, (err) => {
    assert.ifError(err)
    console.log('文件夹创建成功')
    // 再创建一个文件夹
    fs.mkdir(dir, 0o666, (err) => {
        assert.ok(err instanceof Error)
        console.log(err.message)
        // 然后删除文件夹
        fs.rmdirSync(dir)
        console.log('文件夹删除成功')
    })
})
