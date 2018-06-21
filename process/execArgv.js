/**
 * process.execArgv属性包含了在启动nodejs程序的时候的特定的命令行选项
 * 这些属性在process.argv中是不会出现的，并且也不会包含node的可执行路径及后续的参数
 * 这些选项在创建子进程的时候有用
 */
const assert = require('assert')
const spawn = require('child_process').spawn

if (process.argv[2] === 'child') {
    process.stdout.write(JSON.stringify(process.execArgv))
} else {
    const execArgv = ['--stack-size=256']
    const args = [__filename, 'child', 'arg0']

    const child = spawn(process.execPath, execArgv.concat(args))
    let out = ''

    child.stdout.on('data', (chunk) => {
        out += chunk
    })
    child.on('close', () => {
        console.log(out)
        assert.deepStrictEqual(JSON.parse(out), execArgv)
    })
}