/**
 * 测试path指定的文件或者目录的权限
 * mode是一个可选的整数，指定要执行的可访问性的检查
 * callback是一个回调函数，只接收error作为参数，如果可访问行失败的话，值为非null
 * 
 * 有三个常量可以表示文件的权限
 * fs.R_OK: 可读
 * fs.W_OK: 可写
 * fs.X_OK: 可执行
 */

 const fs = require('fs')
 const path = require('path')
 const assert = require('assert')

//  指定三个测试文件
const doesNotExist = path.resolve(__dirname, '_this_does_not_exists')
const readonlyFile = path.resolve(__dirname, 'read_only_file')
const writeonlyFile = path.resolve(__dirname, 'write_only_file')

const F = fs.F_OK
const R = fs.R_OK
const W = fs.W_OK
const X = fs.X_OK
const noop = () => {}
//  创建具有特定权限的文件
function createFileWithPerms(file, mode) {
    fs.writeFileSync(file, '')
    fs.chmodSync(file, mode)
}

// 抛出异常
function throwNextTick (e) {
    process.nextTick(() => {
        throw e
    })
}

createFileWithPerms(readonlyFile, 0o444)
createFileWithPerms(writeonlyFile, 0o666)

// 测试表示文件的常量是不是一个整数
assert.strictEqual(typeof F, 'number')
assert.strictEqual(typeof R, 'number')
assert.strictEqual(typeof W, 'number')
assert.strictEqual(typeof X, 'number')

// 测试当前文件是不是有可访问性
fs.access(__filename, (...args) => {
    assert.deepStrictEqual(args, [null])
})

// promise的形式测试当前文件的可访问性
// 这个需要在node10访问fs.promises
fs.promises.access(__dirname)
    .then(noop)
    .catch(throwNextTick)

// 判断当前文件是不是有读权限
fs.access(__filename, R, (...args) => {
    assert.deepStrictEqual(args, [null])
})

fs.promises.access(__filename, R)
    .then(noop)
    .catch(throwNextTick)

// 判断创建的只读文件是不是有读权限
fs.access(readonlyFile, F | R, (...args) => {
    assert.deepStrictEqual(args, [null])
})

fs.promises.access(readonlyFile, F | R)
    .then(noop)
    .catch(throwNextTick)

// 测试只读文件的写权限
fs.access(readonlyFile, W, (err) => {
    assert.ok(err instanceof Error)
})

fs.promises.access(readonlyFile, W)
    .then(noop)
    .catch(throwNextTick)

// 测试读写文件的可写权限
fs.access(writeonlyFile, W, (err) => {
    assert.deepStrictEqual(args, [null])
})

fs.promises.access(writeonlyFile, W)
    .then(noop)
    .catch(throwNextTick)

// 测试文件不存在的时候，获取文件的访问性会报错
{
    function expectedError(err) {
        assert.notStrictEqual(err, null)
        assert.strictEqual(err.code, 'ENOENT')
        assert.strictEqual(err.path, doesNotExist)
    }

    fs.access(doesNotExist, expectedError)
    fs.promises.access(doesNotExist)
        .then(noop)
        .catch(throwNextTick)
}