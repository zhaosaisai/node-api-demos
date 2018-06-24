/**
 * 在创建子进程的过程中如果发生了错误，就会触发error事件
 * 一般会有下面三种情况
 *  1. 进程无法被衍生
 *  2. 进程无法被杀死
 *  3. 向子进程发送信息失败
 * 
 * 在错误发生之后，exit事件可能会也可能不会被触发
 */
const assert = require('assert')
const { spawn, fork } = require('child_process')
const fs = require('fs')

{
    // 进程无法被衍生
    if (process.argv[2] === 'none') {
        const nonExistsFile = 'a-none-exists-file'
        assert.strictEqual(fs.existsSync(nonExistsFile), false)
        const aErrorChild = spawn(nonExistsFile, ['bar'])
        aErrorChild.on('error', err => {
            console.log('Error happened')
            console.log(err)
            assert.strictEqual(err.code, 'ENOENT')
            assert.strictEqual(err.path, nonExistsFile)
            assert.strictEqual(err.syscall, `spawn ${nonExistsFile}`)
        })
    }
}
{
    // 无法向子进程发送信息
    if (process.argv[2] === 'child') {
        process.on('message', msg => {
            console.log(`First: ${JSON.stringify(msg)}`)
        })
    } else {
        // fork会直接在父子进程之间建立ipc通道
        // const child = fork([__filename, 'child'])
        // spawn需要明确的使用ipc来建立ipc通道，而且只能有一个
        const child = spawn(process.execPath, [__filename, 'child'], {
            stdio: [0, 1, 2, 'ipc']
        })

        child.send({
            word: 'hello world'
        })

        process.nextTick(() => {
            // 断开连接
            child.disconnect()
        })

        setTimeout(() => {
            // 连接断开之后是无法发送信息的
            child.send({
                word: '根本发不出去了'
            })
        }, 1000)

        child.on('error', err => {
            console.log('Error happened')
            console.log(err)
        })
    }
}