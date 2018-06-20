/**
 * process.config返回的是一个javascript对象
 * 这个对象中包含了编译Nodejs执行程序的时候涉及到的配置信息
 */
const path = require('path')
const assert = require('assert')
const fs = require('fs')

// 检查是否存在process.config
assert.ok(process.hasOwnProperty('config'))
// 检查process.config是否是一个对象
assert.ok(Object(process.config), process.config)

for (let attr in process.config) {
    console.log(attr, '=>', process.config[attr])
}