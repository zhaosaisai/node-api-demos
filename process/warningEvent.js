/**
 * 任何时候nodejs发出进程告警都会触发warning事件
 * 这个事件的回调函数接收一个Error对象作为参数，这个对象有三个基本的属性来描述告警
 *  name：告警的名称
 *  message：系统提供的对这个告警信息的描述
 *  stack：当告警触发的时候，包含代码位置的堆栈信息
 */
const assert = require('assert')

function test1() {
    // Output is skipped if the argument to the 'warning' event is
    // not an Error object.
    process.emit('warning', 'test')
    setImmediate(test2)
}

function test2() {
    // Output is skipped if it's a deprecation warning and
    // process.noDeprecation = true
    process.noDeprecation = true
    process.emitWarning('test', 'DeprecationWarning')
    process.noDeprecation = false
    setImmediate(test3)
}

function test3() {
    // Type defaults to warning when the second argument is an object
    process.emitWarning('test', {})
    process.once('warning', (warning) => {
        assert.strictEqual(warning.name, 'Warning')
    })
    setImmediate(test4)
}

function test4() {
    // process.emitWarning will throw when process.throwDeprecation is true
    // and type is `DeprecationWarning`.
    process.throwDeprecation = true;
    assert.throws(
        () => process.emitWarning('test', 'DeprecationWarning'),
        /^DeprecationWarning: test$/);
    process.throwDeprecation = false;
    setImmediate(test5);
}

function test5() {
    // Setting toString to a non-function should not cause an error
    const err = new Error('test')
    err.toString = 1
    process.emitWarning(err)
    setImmediate(test6)
}

function test6() {
    process.emitWarning('test', { detail: 'foo' });
    process.once('warning', (warning) => {
        assert.strictEqual(warning.detail, 'foo');
    })
    setImmediate(test7)
}

function test7() {
    require('events').defaultMaxListeners = 1
    process.on('foo', () => {})
    process.on('foo', () => {})

    process.once('warning', (err) => {
        console.log(err.name)
        console.log(err.message)
        console.log(err.stack)
    })
}

test1()
