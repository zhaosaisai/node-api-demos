const assert = require('assert')
const fork = require('child_process').fork

let gotMessage
let gotExit
let gotClose

const cp = fork('./msg.js')

cp.on('message', (msg) => {
    assert(!gotMessage)
    assert(!gotClose)
    assert.deepStrictEqual(msg, {
        d: 'hello world'
    })
    gotMessage = true
})

cp.on('exit', () => {
    assert(!gotExit)
    assert(!gotClose)
    gotExit = true
})

cp.on('close', () => {
    assert(gotMessage)
    assert(gotExit)
    assert(!gotClose)
    gotClose = true
})