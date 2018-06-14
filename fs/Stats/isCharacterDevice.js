/**
 * stat.isCharacterDevice()
 * 如果文件是一个字符设备的话，就返回true
 */
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const file = path.resolve(__dirname, './index.js')
const characterFile = '/dev/tty'

fs.stat(file, (err, stat) => {
    assert.ok(!stat.isBlockDevice())
})

/**
 * Mac 系统下 /dev/tty 是一个字符设备 通过 ll /dev/tty
 * crw-rw-rw-  1 root  wheel    2,   0  6 14 11:35 /dev/tty
 * 第一个字符是 b 就表示是块设备文件
 */
fs.stat(characterFile, (err, stat) => {
    assert.ok(stat.isCharacterDevice())
})