const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, './README.md')

fs.stat(file, (err, stat) => {
    assert.ifError(err)
    assert.ok(stat.mtime instanceof Date)
})

fs.stat('.', (err, stat) => {
    assert.ok(stat.hasOwnProperty('blksize'))
    assert.ok(stat.hasOwnProperty('blocks'))
})

fs.lstat(file, (err, stat) => {
    assert.ifError(err)
    assert.ok(stat.mtime instanceof Date)
})

fs.open('.', 'r', undefined, (err, fd) => {
    assert.ifError(err)
    assert.ok(fd)

    fs.fstat(fd, (err, stat) => {
        assert.ifError(err)
        assert.ok(stat.mtime instanceof Date)
        fs.close(fd, assert.ifError)
    })
})