/**
 * subprocess.pid
 * 这个属性主要是返回子进程的pid
 */
const assert = require('assert')
const spawn = require('child_process').spawn

const child = spawn('ls')

console.log(child.pid)
assert.strictEqual(typeof child.pid, 'number')
