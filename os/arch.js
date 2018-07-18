/**
 * os.arch() 
 * 这个方法返回一个字符串，表明nodejs二进制编译的时候使用的系统架构
 * 
 * 现在可能的值有: 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', 'x64'。
 * 
 * 这个方法和process.arch是等价的
 */

 const os = require('os')
 const assert = require('assert')

 console.log(`我的系统的架构是 ${os.arch()}`)
 console.log(`我的系统的架构是 ${process.arch}`)

 assert.strictEqual(process.arch, os.arch())