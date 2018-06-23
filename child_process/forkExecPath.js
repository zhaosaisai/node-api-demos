/**
 * execPath用于设置可执行文件的命令
 */

 // 比如，需要执行一个 python 程序
const assert = require('assert')
const { fork, spawn } = require('child_process')

if (process.argv[2] === 'fork') {
    fork('./test.py', {
        execPath: 'python'
    })
} else {
    const cp = spawn(process.execPath, [__filename, 'fork'])
    let out = ''

    cp.stdout.on('data', chunk => {
        out += chunk.toString()
    })

    cp.on('exit', () => {
        assert.strictEqual(out, 'hello python\n')
    })
}
