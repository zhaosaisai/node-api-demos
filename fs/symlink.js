/**
 * fs.symlink(target, path, [type], callback)
 * 创建符号链接 -- 创建的是软链接
 * 在windows平台上，type可以是file，dir，junction等，默认是file
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

let linkTime
let fileTime

const linkData = path.resolve(__dirname, 'linkData.txt')
const linkPath = path.resolve(__dirname, 'linkPath.txt')

fs.writeFileSync(linkData)

fs.symlink(linkData, linkPath, (err) => {
    assert.ifError(err)
    
    // 读取链接文件的状态
    fs.lstat(linkPath, (err, stat) => {
        assert.ifError(err)
        linkTime = stat.mtime.getTime()
    })

    // 读取源文件的状态
    fs.stat(linkData, (err, stat) => {
        assert.ifError(err)
        fileTime = stat.mtime.getTime()
    })

    // 读取链接文件的真实路径
    fs.readlink(linkPath, (err, dest) => {
        assert.ifError(err)
        assert.strictEqual(dest, linkData)
    })
})