/**
 * 
 */
const assert = require('assert')
const child_process = require('child_process')

function test(cmd, code) {
    cmd('a-not-exists-cmd', (err) => {
        console.log(err)
        assert.strictEqual(err.code, code)
        assert(err.cmd.includes('a-not-exists-cmd'))
    })
}

test(child_process.exec, 127)