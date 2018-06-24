const assert = require('assert')
const spawn = require('child_process').spawn

if (process.argv[2] === 'parent') {
    parent()
} else {
    grandparent()
}

function grandparent() {
    const child = spawn(process.execPath, [__filename, 'parent'])
    child.stderr.pipe(process.stderr)

    let out = ''
    let input = 'hello parent'

    child.stdout.on('data', chunk => {
        out += chunk
    })

    child.stdout.setEncoding('utf8')

    child.stdin.end(input)
    child.on('close', (code, signal) => {
        console.log(out)
        assert.strictEqual(code, 0)
        assert.strictEqual(out, input)
        assert.strictEqual(signal, null)
    })
}

function parent() {
    spawn('cat', [], {
        stdio: 'inherit'
    })
}