/**
 * subprocess.kill([SIGHUB])
 * 这个方法主要是给子进程发送信号
 * 
 * 已发送信号给子进程后
 * subprocess.killed会被设置为true
 */
const assert = require('assert')
const spawn = require('child_process').spawn

const cat = spawn('cat')

cat.stdout.on('end', () => {})
cat.stderr.on('data', () => {})
cat.stderr.on('end', () => {})

cat.on('exit', (code, signal) => {
    assert.strictEqual(code, null)
    assert.strictEqual(signal, 'SIGKILL')
})

assert.strictEqual(cat.killed, false)
cat.kill('SIGKILL')
assert.strictEqual(cat.killed, true)