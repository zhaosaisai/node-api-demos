/**
 * timeout这个选项用来设置子进程的超时时间
 */

 const exec = require('child_process').exec
 const assert = require('assert')

 if (process.argv[2] === 'child') {
     setTimeout(() => {
        console.log('child stdout')
        console.error('child stderr')
     }, 1000)
     return
 }

 const cmd = `"${process.execPath}" "${__filename}" child`

 exec(cmd, { timeout: 1 }, (err, stdout, stderr) => {
     assert(err instanceof Error)
     assert(err.killed)
     assert.strictEqual(err.cmd, cmd)
     assert.strictEqual(stdout, '')
     assert.strictEqual(stderr, '')
 })

 exec(cmd, { timeout: 1, killSignal: 'SIGKILL' }, (err, stdout, stderr) => {
    assert(err instanceof Error)
    assert(err.killed)
    assert.strictEqual(err.cmd, cmd)
    assert.strictEqual(stdout, '')
    assert.strictEqual(stderr, '')
    assert.strictEqual(err.signal, 'SIGKILL')
 })

 exec(cmd, { timeout: 2e4, killSignal: 'SIGKILL' }, (err, stdout, stderr) => {
    assert.ifError(err)
    assert.strictEqual(stdout, 'child stdout\n')
    assert.strictEqual(stderr, 'child stderr\n')
 })