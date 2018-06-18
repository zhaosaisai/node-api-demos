/**
 * fs.rename(oldPath, newPath, callback)
 * 重命名一个文件 或者 移动一个文件
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const oldPath = path.resolve(__dirname, 'old.txt')
const newPath = path.resolve(__dirname, 'new.txt')
const mvPath = path.resolve(__dirname, 'tmp/mv.txt')

function createFile(path) {
    fs.closeSync(fs.openSync(path, 'w'))
}

// 创建一个文件
createFile(oldPath)

function rename() {
    // 重命名文件
    fs.rename(oldPath, newPath, (err) => {
        assert.ifError(err)
        console.log('文件重命名成功')
        process.nextTick(() => {
            mv()
        })        
    })
}

function mv() {
    // 移动文件
    fs.rename(newPath, mvPath, (err) => {
        assert.ifError(err)
        console.log('文件移动成功')
    })
}

process.nextTick(() => {
    rename()
})
