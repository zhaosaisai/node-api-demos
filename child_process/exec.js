/**
 * child_process.exec(command, [options], [callback]) 
 * command: 需要在子进程中运行的命令，参数之间通过空格进行分开
 * options：
 *  cwd：用于设置执行子进程命令时候的工作目录
 *  env：设置子进程工作时候的环境变量
 *  encoding：设置子进程输出内容的字符编码
 *  shell：设置执行子进程命令的shell，在unix平台上是/bin/sh
 *  timeout：如果子进程运行的时间超过这个值的时候，那么父进程就会向子进程发送killSignal命令
 *  maxBuffer：stdout和stderr默认输出的最大字节数，默认是200*1024。如果超出了这个限制，则子进程会被终止
 *  killSignal：在超时的时候，父进程向子进程发送的信号事件，默认是SIGTERM
 *  uid：设置进程的用户标识
 *  gid：设置进程的组标识
 * callback：会在进程终止的时候调用，这个函数会接受进程的标准输出和标准错误输出作为参数
 *  函数签名是(err, stdout, stderr)
 * 
 * 这个方法不会替换现有的进程，而是通过创建一个新的进程来执行命令
 */

//  下面是一个简单的exec例子
const { exec } = require('child_process')

// 下面的回调函数在执行的时候会接受三个参数
// 当成功的时候第一个参数是null，当失败的时候第一个参数是一个Error实例
// 这个实例有两个属性，
// err.code表示的是子进程的退出码，所有的非0的退出码都可以被视为错误
// err.signal会被设置为终止进程的信号
// 第二个参数是子进程的标准输出
// 第三个参数是子进程的标准错误输出
// 我们可以通过options的encoding属性来设置输出的编码，默认是utf8
exec('cat ./exec.js | wc -l', (err, stdout, stderr) => {
    if (err) {
        console.log(`Got the error ${err}`)
        return
    }
    console.log(`Stdout: ${stdout}`)
    console.log(`Stderr: ${stderr}`)
})