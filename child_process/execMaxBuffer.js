/**
 * maxBuffer选项用于设置子进程最大的输出字节
 */
const assert = require('assert')
const cp = require('child_process')

function checkFatory(streamName) {
    return (err) => {
        assert.strictEqual(err.message, `${streamName} maxBuffer exceeded`)
        assert(err instanceof Error)
    }
}

// maxBuffer为Infinity的情况
{
    const cmd = `"${process.execPath}" -e "console.log('hello world')"`
    const options = { maxBuffer: Infinity }

    cp.exec(cmd, (err, stdout, stderr) => {
        assert.ifError(err)
        assert.strictEqual(stdout.trim(), 'hello world')
        assert.strictEqual(err, null)
        assert.strictEqual(stderr, '')
    })
}

// maxBuffer为具体数值的情况
{
    const cmd = 'echo "hello world"'
    cp.exec(cmd, {
        maxBuffer: 5
    }, checkFatory('stdout'))
}

// 测试中文
const unicode = '中文测试' // length: 3, byte length: 12
{
    const cmd = `"${process.execPath}" -e "console.log('${unicode}')"`

    cp.exec(cmd, { maxBuffer: 10 }, checkFatory('stdout'))
}

{
    const cmd = `"${process.execPath}" -e "console.error('${unicode}')"`

    const child = cp.exec(
      cmd,
      { encoding: null, maxBuffer: 10 },
      checkFatory('stderr'))
}