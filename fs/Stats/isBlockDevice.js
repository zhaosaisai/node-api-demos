/**
 * 如果fs.Stats对象是一个块设备，则返回true
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, './index.js')
const blockFile = '/dev/disk2'

fs.stat(file, (err, stat) => {
    assert.ok(!stat.isBlockDevice())
})

/**
 * Mac 系统下 /dev/disk2 是一个块设备 通过 ll /dev/disk2
 * br--r-----  1 zhaosai  staff    1,   8  6 14 11:41 /dev/disk2
 * 第一个字符是 b 就表示是块设备文件
 */
fs.stat(blockFile, (err, stat) => {
    assert.ok(stat.isBlockDevice())
})