/**
 * process.env 
 * 返回一个包含用户环境信息的对象
 */
const assert = require('assert')

// 环境变量的改变也会影响子进程中的环境变量
if (process.argv[2] === 'child') {
    assert.strictEqual(false, 'NODE_PROCESS_ENV_DELETED' in process.env)
    assert.strictEqual('42', process.env.NODE_PROCESS_ENV)
    assert.strictEqual('asdf', process.env.hasOwnProperty)
    const hasOwnProperty = Object.prototype.hasOwnProperty
    const has = hasOwnProperty.call(process.env, 'hasOwnProperty')
    assert.strictEqual(has, true)
    process.exit(0)
}

{
    const spawn = require('child_process').spawn
    assert.strictEqual(
        Object.prototype.hasOwnProperty,
        process.env.hasOwnProperty
    )
    const has = process.env.hasOwnProperty('hasOwnProperty')
    assert.strictEqual(false, has)

    process.env.hasOwnProperty = 'asdf'
    process.env.NODE_PROCESS_ENV = 42
    assert.strictEqual('42', process.env.NODE_PROCESS_ENV)

    process.env.NODE_PROCESS_ENV_DELETED = 42
    assert.strictEqual(true, 'NODE_PROCESS_ENV_DELETED' in process.env)

    delete process.env.NODE_PROCESS_ENV_DELETED
    assert.strictEqual(false, 'NODE_PROCESS_ENV_DELETED' in process.env)

    const child = spawn(process.argv[0], [process.argv[1], 'child'])
    child.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    child.stderr.on('data', (data) => {
        console.log(data.toString())
    })
    child.on('exit', (code) => {
        if (code !== 0) {
            process.exit(code)
        }
    })
}