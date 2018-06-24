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
const spawn = require('child_process').spawn
const fs = require('fs')

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