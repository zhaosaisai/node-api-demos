const assert = require('assert')
const { spawn, fork } = require('child_process')

switch (process.argv[2] || '') {
    case '':
        fork(__filename, ['fork']).on('exit', check)
    case 'fork':
        spawn(process.execPath, [__filename, 'spawn']).on('exit', check)
    case 'spawn':
        break
    default:
        assert.fail()
}

function check(code) {
    console.log(`The exit code is ${code}`)
    assert.strictEqual(code, 0)
}

