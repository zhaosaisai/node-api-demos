/**
 * cwd选项：设置子进程的执行目录
 */
const { exec } = require('child_process')
const assert = require('assert')

exec('pwd', { cwd: '/dev' }, (err, stdout, stderr) => {
    assert.ifError(err)
    assert(stdout.startsWith('/dev'))
})