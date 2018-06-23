/**
 * env选项：设置子进程中的环境变量
 */
const assert = require('assert')
const exec = require('child_process').exec

let success_count = 0
let error_count = 0
let response = ''
let child

function after(err, stdout, stderr) {
    if (err) {
        error_count++
        console.log(`error: ${err.code}`)
        console.log(`stdout: ${JSON.stringify(stdout)}`)
        console.log(`stderr: ${JSON.stringify(stderr)}`)
        assert.strictEqual(err.killed, true)
    } else {
        success_count++
        assert.notStrictEqual(stdout, '')
    }
}

child = exec(
    'set',
    { env: Object.assign({}, process.env, { 'HELLO': 'WORLD' })},
    after
)

child.stdout.setEncoding('utf8')
child.stdout.on('data', (chunk) => {
    response += chunk
})

process.on('exit', () => {
    console.log(`Response: ${response}`)
})