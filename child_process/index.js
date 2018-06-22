/**
 * child_process模块提供了创建子进程的功能。这个功能主要是通过child_process.spawn()方法提供的
 * 
 * 默认的情况下，nodejs创建的子进程和父进程之间会创建stdin、stdout、stderr管道。数据能够以非阻塞的方式在管道中流动。
 * child_process.spawn()会创建异步的子进程，不会阻塞事件循环，
 * child_process.spawnSync()会创建同步的子进程，会阻塞事件循环，直至被创建的子进程退出或者终止
 * 
 * child_process还提供了一些创建其他子进程的方法，每个方法都是通过child_process.spawn()方法衍生过来的
 * 
 * child_process.exec()：衍生一个shell并在shell上面执行命令，命令的输出会传入stdout和stderr到回调函数
 * child_process.execFile()：功能和child_exec相似，但是是直接衍生命令，不会创建新的shell
 * child_process.fork()：衍生出一个新的nodejs进程，并在父子进程之间建立ipc通道
 * 除此，还存在child_process.execSync和child_process.execFileSync来创建同步的子进程
 * 
 * 上述的接口的返回值是一个childProcess的实例，这个实例实现了EventEmitter接口。允许我们在父进程中监听事件，当子进程中发生特定的事件的时候会
 * 调用这些函数
 * 
 * child_process.exec和child_process.execFile可以接收一个额外的回调函数，这个函数会在子进程结束的时候被调用。
 */

 const spawn = require('child_process').spawn

 const ls = spawn('ls', ['-lh', '/usr'])

 ls.stdout.on('data', (chunk) => {
     console.log(`The data is ${chunk.toString()}`)
 })

 ls.stderr.on('data', (chunk) => {
     console.log(`The error is ${chunk.toString()}`)
 })

 ls.on('exit', (code) => {
     console.log(`The exit code is ${code}`)
 })