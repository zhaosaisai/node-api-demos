/**
 * process.execFile(file[, args][, options][, callback])
 * 这个方法主要是执行可执行文件的
 * 
 * file：可执行文件的名称或者路径
 * args：传递给可执行文件的参数列表
 * options: 设置在执行可执行文件时候的一只鞋选项
 *  cwd：执行子进程的工作目录
 *  env：设置子进程执行时候的环境变量
 *  encoding：设置子进程的标准输出和标准错误输出的编码
 *  timeout：如果子进程运行的时间超过这个值的时候，那么父进程就会向子进程发送killSignal命令
 *  maxBuffer: stdout和stderr默认输出的最大字节数，默认是200*1024。如果超出了这个限制，则子进程会被终止
 *  killSignal: 在超时的时候，父进程向子进程发送的信号事件，默认是SIGTERM
 *  uid: 设置进程的用户标识
 *  gid：设置进程的组标识
 *  windowsHide： 是否隐藏在Windows系统下默认会弹出的子进程控制台窗口。 默认为: false。
 *  windowsVerbatimArguments：决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略，当指令 shell 存在的时该属性将自动被设置为true。默认为: false。
 * callback：当进程终止的时候被调用的回调函数
 *  err：
 *  stdout：标准输出
 *  stderr：标准错误输出
 * 返回值也是一个子进程对象
 * 
 * 这个方法类似于child_process.exec，但是不会衍生出一个新的shell。指定的可执行文件会被衍生出一个
 * 新的进程。这样使得这个方法比exec更高效。
 * 
 * 另外这个方法执行命令的时候是通过一个数组来指定的。
 * 这个方法没有衍生出新的shell，所以是不支持I/O重定向和文件查找这样的行为的
 */
const { execFile } = require('child_process')
const assert = require('assert')

const child = execFile('node', ['--version'], (err, stdout, stderr) => {
    assert.ifError(err)
    console.log(`The node version is ${stdout}`)
    assert.strictEqual(stderr, '')
})