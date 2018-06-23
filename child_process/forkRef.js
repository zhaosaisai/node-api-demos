const assert = require('assert')
const fork = require('child_process').fork

if (process.argv[2] === 'child') {
    // 向父进程发送信息
    process.send('1')

    setTimeout(() => {
        process.send('2')
    }, 200)

    process.on('disconnect', () => {
        process.stdout.write('come on baby')
    })
} else {
    const cp = fork(__filename, ['child'], { silent: true })
    let msgs = []
    let out = ''

    cp.on('message', (msg) => {
        msgs.push(msg)

        if (msg === '2') cp.disconnect()
    })

    // 如果silent不是true，是无法监听这个事件的
    cp.stdout.on('data', chunk => {
        out += chunk
    })

    cp.once('exit', () => {
        assert.deepStrictEqual(msgs, ['1', '2'])
        assert.strictEqual(out, 'come on baby')
    })
}