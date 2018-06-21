/**
 * process.send(message[, sendHandle[, options]][, callback])
 * 如果nodejs的进程是通过IPC创建的，那么这个方法主要是用于向父进程发送信息
 */
const assert = require('assert')
const fork = require('child_process').fork

if (process.argv[2] === 'child') {
    process.send('ok', (err) => {
        assert.strictEqual(err, null)
    })
} else {
    const child = fork(__filename, ['child'])
    child.on('message', (msg) => {
        console.log(`Got the message ---> ${msg}`)
        assert.strictEqual(msg, 'ok')
    })

    child.on('exit', (exitCode, signalCode) => {
        assert.strictEqual(exitCode, 0)
        assert.strictEqual(signalCode, null)
    })
}