/**
 * process.execPath返回启动nodejs进程的可执行文件的绝对路径
 */
const assert = require('assert')
const fs = require('fs')
const child_process = require('child_process')
const path = require('path')

if (process.argv[2] === 'child') {
    console.log(process.execPath)
} else {
    const symlinkedNode = path.join(__dirname, 'symlinked-node')
    fs.symlinkSync(process.execPath, symlinkedNode)
    
    const proc = child_process.spawnSync(symlinkedNode, [__filename, 'child'])
    assert.strictEqual(proc.stderr.toString(), '')
    assert.strictEqual(proc.stdout.toString(), `${process.execPath}\n`)
    assert.strictEqual(proc.status, 0)
}