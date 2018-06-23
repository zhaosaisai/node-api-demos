const assert = require('assert')
const { spawn, fork } = require('child_process')

if (process.argv[2] === 'fork') {
    process.stdout.write(JSON.stringify(process.execArgv), () => {
        process.exit()
    })
} else if (process.argv[2] === 'child') {
    fork(__filename, ['fork'])
} else {
    const execArgv = ['--stack-size=256']
    const args = [__filename, 'child', 'arg0']

    const child = spawn(process.execPath, execArgv.concat(args))
    let out = ''

    child.stdout.on('data', chunk => {
        out += chunk
    })

    child.on('exit', () => {
        assert.deepStrictEqual(JSON.parse(out), execArgv)
    })
}