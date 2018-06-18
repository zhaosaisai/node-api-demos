/**
 * fs.futimes(fd, atime, mtime, callback)
 * 这个方法主要是用于修改文件的时间戳属性
 * 主要是用于修改atime和mtime这两个时间戳属性
 * 
 * 注意，以上两个属性都是以s为单位的
 */
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const log = console.log.bind(console)
const file = path.resolve(__dirname, 'futimes.txt')

function stat_resource(resource) {
    if (typeof resource === 'string') {
        return fs.statSync(resource)
    } else {
        // ensure mtime has been written into disk
        fs.fstatSync(resource)
        return fs.fstatSync(resource)
    }
}

function check_mtime(resource, mtime) {
    mtime = fs._toUnixTimestamp(mtime)
    const stats = stat_resource(resource)
    const real_time = fs._toUnixTimestamp(stats.mtime)
    // check up to single-second precision
    // sub-second precision is OS and fs dependant
    return mtime - real_mtime < 2
}

function createFile(path) {
    fs.closeSync(fs.openSync(path, 'w'))
}

function sleep(time) {
    let now = Date.now()
    time = time * 1000
    while(Date.now() - now < time) {}
}

// 创建一个文件
createFile(file)

// 获取这个文件的atime和mtime
const originStat = stat_resource(file)
log(`文件原有的时间戳是->mtime: ${new Date(originStat.mtime)} -> atime: ${new Date(originStat.atime)}`)

// 沉睡5s
sleep(5)

// 更改文件的时间戳属性
const fd = fs.openSync(file, 'w')

fs.futimes(fd, Date.now() / 1000, Date.now() / 1000, (err) => {
    assert.ifError(err)
    const stat = stat_resource(file)
    log(`文件现有的时间戳是->mtime: ${new Date(stat.mtime)} -> atime: ${new Date(stat.atime)}`)
})