/**
 * child_process.fork(modulePath[, args][, options])
 * 这个方法也是在子进程中执行模块
 * modulePath：要在子进程中运行的模块
 * args：运行子进程模块的时候需要传递的参数列表
 * options：子进程运行的时候的一些选项
 *  cwd：设置子进程的工作目录
 *  env：设置子进程工作时候的环境变量
 *  execPath：创建子进程的可执行路径
 *  execArgv：传递给可执行路径的参数列表
 *  silent：如果设置为true，则子进程中的stdin，stdout，stderr会被导入到父进程中，否则他们会继承父进程。
 *  默认是false
 *  stdio：如果提供了这个选项，它会覆盖silent的行为。如果提供了一个数组，则数组中必须包含一个ipc选项
 *  否则会报错
 *  windowsVerbatimArguments：决定windows系统下是否使用转义函数
 *  uid：设置该进程的用户标识
 *  gid：设置进程的组标识
 * 
 * 这个方法返回的也是一个childProcess对象，这个子进程对象有一个额外的内置通信通道。
 * 允许消息在父进程和子进程之间来回传递。
 * 
 * 衍生的 Node.js 子进程与两者之间建立的 IPC 通信信道的异常是独立于父进程的。
 * 默认情况下，child_process.fork() 会使用父进程中的 process.execPath 衍生新的 Node.js 实例。
 * options 对象中的 execPath 属性可以替换要使用的执行路径。
 * 
 * 在使用child_process.fork() 产生的子进程内，
 * 使用 child_process.spawn() 会自动忽略掉其中的shell 配置选项并不会生效。
 */
const assert = require('assert')
const { fork } = require('child_process')

const n = fork('./index.js', ['foo', 'bar'])

console.log(n.channel)

assert.strictEqual(n.channel, n._channel)

n.on('message', (msg) => {
    console.log(`Got the message ${JSON.stringify(msg)}`)
    assert.strictEqual(msg.d, 'hello world')
})

n.send({
    d: 'hello world'
})

n.on('exit', (code) => {
    console.log('Child exited')
    assert.strictEqual(code, 0)
})