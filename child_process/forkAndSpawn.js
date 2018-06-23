const assert = require('assert')
const { spawn, fork } = require('child_process')

switch (process.argv[2] || '') {
    case '':
        fork(__filename, ['fork']).once('exit', check)
    case 'fork':
        spawn(process.execPath, [__filename, 'spawn']).once('exit', check)
    case 'spawn':
        break
    default:
        assert.fail()
}

function check(code) {
    // 为什么会输出三次 TODO
    console.log(`The exit code is ${code}`, process.pid, process.ppid)
    assert.strictEqual(code, 0)
}
