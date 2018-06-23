const assert = require('assert')
const fork = require('child_process').fork
const expected = '$foo'

if (process.argv[2] === undefined) {
    const cp = fork(__filename, [expected] ,{
        shell: true,
        env: Object.assign({}, process.env, {
            'foo': 'bar'
        })
    })

    cp.on('exit', (code, signal) => {
        assert.strictEqual(code, 0)
        assert.strictEqual(signal, null)
        assert(!('foo' in process.env))
    })
} else {
    assert.strictEqual(process.argv[2], expected)
}