/**
 * encoding选项：设置子进程输出的内容的编码
 */
const stdoutData = 'foo'
const stderrData = 'bar'

if (process.argv[2] === 'child') {
    console.log(stdoutData)
    console.error(stderrData)
} else {
    const assert = require('assert')
    const cp = require('child_process')
    const expectedStdout = `${stdoutData}\n`
    const expectedStderr = `${stderrData}\n`

    function run(options, callback) {
        const cmd = `"${process.execPath}" "${__filename}" child`
        cp.exec(cmd, options, (err, stdout, stderr) => {
            assert.ifError(err)
            callback(stdout, stderr)
        })
    }
    // 默认的编码格式，应该是utf8
    run({}, (stdout, stderr) => {
        assert.strictEqual(typeof stdout, 'string')
        assert.strictEqual(typeof stderr, 'string');
        assert.strictEqual(stdout, expectedStdout);
        assert.strictEqual(stderr, expectedStderr);
    })
    // 声明为utf8
    run({ encoding: 'utf8' }, (stdout, stderr) => {
        assert.strictEqual(typeof stdout, 'string');
        assert.strictEqual(typeof stderr, 'string');
        assert.strictEqual(stdout, expectedStdout);
        assert.strictEqual(stderr, expectedStderr);
    });
    // 测试buffer编码
    [undefined, null, 'buffer', 'invalid'].forEach((encoding) => {
        run({ encoding }, (stdout, stderr) => {
            assert(stdout instanceof Buffer);
            assert(stdout instanceof Buffer);
            assert.strictEqual(stdout.toString(), expectedStdout);
            assert.strictEqual(stderr.toString(), expectedStderr);
        });
    });
}