/**
 * child_process.spawn(command, [args], [options])
 * spawn是创建子进程最基本的方法，其他的三个创建子进程的方法都是依赖这个方法实现的。
 * 这个方法接收三个参数
 * command：要执行的命令
 * args：传递给执行命令的参数
 * options：在创建子进程时候的一些选项
 *  cwd：设置子进程当前工作的目录
 *  env：设置子进程工作时候的环境变量
 *  argv0：显示设置发给子进程的argv0的值，默认是command
 *  stdio：子进程的stdio配置
 *  detached：准备将子进程独立于父进程，依赖于平台的实现
 *  uid：设置进程的用户标识
 *  gid：设置进程的用户的组标识
 *  shell：默认是false，如果是true的话，则会在一个新的shell上来执行命令
 *  windowsVerbatimArguments：决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略，
 *  当指令 shell 存在的时该属性将自动被设置为true。默认值: false。
 *  windowsHide：是否隐藏在Windows系统下默认会弹出的子进程控制台窗口。 默认为: false。
 * 
 * 返回的也是一个child process对象
 */

 const spawn = require('child_process').spawn
 {
    const ls = spawn('ls', ['-lh', '/usr'])
    ls.stdout.on('data', chunk => {
        console.log(`Got the data \n ${chunk.toString()}`)
    })

    ls.stderr.on('data', chunk => {
        console.log(`Got the err \n ${chunk.toString()}`)
    })

    ls.on('close', () => {
        console.log('Close the process')
    })
 }

 {
    //  ps ax | grep ssh
    // nodejs实现
    const ps = spawn('ps', ['ax'])
    const grep = spawn('grep', ['ssh'])

    // ps的输出作为grep的输入
    ps.stdout.on('data', chunk => {
        grep.stdin.write(chunk)
    })

    ps.stderr.on('data', chunk => {
        console.log('ps stderr ', chunk)
    })

    ps.on('close', (code) => {
        if (code !== 0) {
            console.log('ps close with code ', code)
        }
        grep.stdin.end()
    })

    grep.stdout.on('data', chunk => {
        console.log('Got grep data')
        console.log(chunk.toString())
    })

    grep.stderr.on('data', chunk => {
        console.log('grep err ', chunk)
    })

    grep.on('close', () => {
        console.log('grep close')
    })
 }