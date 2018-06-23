/**
 * 
 */
const assert = require('assert')
const cp = require('child_process')

if (process.argv[2] === 'child') {
    // 因为设置了maxBuffer是0，这里会抛出错误
    console.log('foo')
} else {
    // 这里我们需要重新定义kill方法。以便在调用这个方法的时候抛出错误

    // TODO：怎么引入internal中的模块

    // const internalCp = require('lib/internal/child_process')
    // const kill = internalCp.ChildProcess.prototype.kill

    // internalCp.ChildProcess.prototype.kill = function() {
    //     kill.apply(this, arguments)
    //     throw new Error('errored')
    // }

    const cmd = `"${process.execPath}" "${__filename}" child`
    const options = {
        maxBuffer: 0,
        killSignal: 'SIGKILL'
    }

    const child = cp.exec(cmd, options, (err, stdout, stderr) => {
        assert.strictEqual(err instanceof Error, true)
        assert.strictEqual(stdout, '')
        assert.strictEqual(stderr, '')
        assert.strictEqual(child.killed, true)
    })
}