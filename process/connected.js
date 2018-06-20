/**
 * 当nodejs的进程是通过IPC创建的时候，如果process.channel保持连接
 * 那么process.connected属性就为true。当调用process.disconnect()方法的时候
 * 这个属性就为false
 */

 const assert = require('assert')
 const fork = require('child_process').fork

 if (process.argv[2] === 'child') {
    process.on('disconnect', () => {
        assert.equal(process.channel, void 0)
        assert.strictEqual(process.connected, false)
    })
 } else {
    const child = fork(__filename, ['child'])
    assert.ok(child.channel)
    assert.ok(child.connected)

    setTimeout(() => {
        child.disconnect()
    })
 }