/**
 * process.argv返回一个数组
 * 这个数组包含了在启动nodejs的程序的时候的命令行参数
 * 第一个参数永远是process.execPath
 * 第二个参数是当前执行的文件的路径
 * 剩下的参数就是其他的可执行参数
 */
const assert = require('assert')
const path = require('path')
const spawn = require('child_process').spawn

const argv = process.argv

assert.strictEqual(argv[0], process.execPath)
assert.strictEqual(argv[1], __filename)
assert.ok(Array.isArray(argv))

if (process.argv[2] !== 'child') {
    const child = spawn(process.execPath, [__filename, 'child'], {
        cwd: path.dirname(process.execPath)
    })

    let childArgv0 = ''
    child.stdout.on('data', (chunk) => {
        childArgv0 += chunk.toString()
    })

    process.on('exit', () => {
        assert.strictEqual(process.execPath, childArgv0)
    })
} else {
    process.stdout.write(process.argv[0])
}
