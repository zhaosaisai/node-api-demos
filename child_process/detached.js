/**
 * 在unix平台上，如果我们将options.detached选项设置为true，则子进程会成为新的进程组和会话的领导者
 * 
 * 默认情况下，父进程会等待被分离的子进程的退出。为了防止父进程等待被分离的子进程，我们可以使用
 * subprocess.unref()方法来让父进程的事件循环中不会包含子进程的引用计数，使得父进程独立于子进程的退出。
 * 除非父子进程之间建立了一个IPC通道。
 * 
 * 当使用detached选项来启动一个长期运行的进程的时候，这个进程并不会在父进程退出后保持在后台运行，
 * 除非我们提供了一个不连接到父进程的stdio设置。如果父进程的stdio是继承的，则子进程会和控制终端
 * 保持连接。
 */

 const spawn = require('child_process').spawn
 const fs = require('fs')

 const out = fs.openSync('./out.log', 'a')
 const err = fs.openSync('./err.log', 'a')

 const cp = spawn(process.execPath, ['./index.js'], {
     detached: true,
     stdio: ['ignore', out, err]
 })

 cp.unref()

//  如果把上面的cp.unref()注释了，会看到终端输出 子进程退出了
// 这说明父进程会等待子进程的退出
 cp.on('exit', () => {
     console.log('子进程退出了')
 })

 process.on('exit', () => {
     console.log('主进程退出了')
 })