/**
 * error事件通常可以在可读流的任意时刻被触发
 * 通常是可读流底层发生错误而不能产生数据或者可读流试图传递错误数据的时候触发
 */
const assert = require('assert')
const fs = require('fs')

// 基于一个不存在的路径创建一个可读流就会发生错误

const readable = fs.createReadStream('/none/exists/path')

readable.on('error', err => {
    console.log(err.message)
    assert.ok(err instanceof Error)
})