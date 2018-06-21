/**
 * process.getgroups()
 * 这个方法主要是用于获取用户所属组的不同id
 * 其中包含：有效的，真实的和补充的
 * 
 * 类似于命令：id -G
 */
const assert = require('assert')
const exec = require('child_process').exec

function check(a, b) {
    for (let i = 0; i < a.length; i++) {
        assert(b.includes(a[i]))
    }
}

function unique(groups) {
    return [...new Set(groups)].sort()
}

if (typeof process.getgroups === 'function') {
    const groups = unique(process.getgroups())
    assert(Array.isArray(groups))
    assert(groups.length > 0)
    exec('id -G', (err, stdout) => {
        assert.ifError(err)
        const realGroups = unique(stdout.match(/\d+/g).map(Number))
        console.log(groups, realGroups)
        assert.deepStrictEqual(groups, realGroups)
        check(groups, realGroups)
        check(realGroups, groups)
    })
}