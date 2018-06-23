/**
 * options.stdio用来设置子进程和父进程之间建立的管道
 * 默认情况下，子进程的stdin，stdout，stderr会重定向到ChildProcess对象上的
 * subProcess.stdin，subProcess.stdout，subProcess.stderr上，这就等同于
 * 将options.stdio设置为['pipe', 'pipe', 'pipe']
 * 
 * 除此之外，还可以将stdio设置为以下三种字符串：
 *  'pipe'：等同于['pipe', 'pipe', 'pipe']
 *  'ignore'：等同于['ignore', 'ignore', 'ignore']
 *  'inherit'：等同于[process.stdin, process.stdout, process.stderr]也可以写为[0, 1, 2]
 * 
 * options.stdio的值也可以是每一个值都对应一个子进程fd的数组。除此也可以创建额外的fd来创建父进程和子进程
 * 之间的额外管道。这个值可以是下面之一：
 *  pipe：创建一个父进程和子进程之间的通信管道。在管道的父端通过subprocess.stdio[fd]的形式作为child_process
 *  对象的一个属性值来暴露给父进程。
 * 
 *  ipc：创建一个用于子进程和父进程之间传递消息或者文件描述符的ipc通道符。一个childProcess最多只能
 *  有一个IPC stdio文件描述符。设置了这个选项的通道，可以通过subprocess.send()方法。如果子进程是一个 Node.js 进程，
 *  则一个已存在的 IPC 通道会在子进程中启用 process.send()、process.disconnect()、process.on('disconnect') 和 process.on('message')。
 *  
 *  ignore： 指示 Node.js 在子进程中忽略 fd。 由于 Node.js 总是会为它衍生的进程打开 fd 0 - 2，
 *  所以设置 fd 为 'ignore' 可以使 Node.js 打开 /dev/null 并将它附加到子进程的 fd 上。
 * 
 *  <Stream>对象：共享一个指向子进程的 tty、文件、socket 或管道的可读或可写流。 流的底层文件描述符在子进程中是重复对应该 stdio 数组的索引的 fd。 
 *  注意，该流必须有一个底层描述符（文件流直到 'open' 事件发生才需要）。
 * 
 *  正整数：数值会被解析成一个在父进程中打开的文件描述符。它是和子进程共享的。
 *  
 *  null, undefined：使用默认值，对于 stdio fd 0、1 和 2（换言之，stdin、stdout 和 stderr）而言是创建了一个管道。
 *   对于 fd 3 及以上而言，默认值为 'ignore'。
 * 
 * 当在父进程和子进程之间建立了一个 IPC 通道，且子进程是一个 Node.js 进程，则子进程会带着未引用的 IPC 通道（使用 unref()）启动，
 * 直到子进程为 process.on('disconnect') 事件或 process.on('message') 事件注册了一个事件句柄。
 * 这使得子进程可以在进程没有通过打开的 IPC 通道保持打开的情况下正常退出。
 */
const assert = require('assert')
const { spawnSync, spawn } = require('child_process')

// 测试pipe的情况
let options = { stdio: ['pipe'] }
let child = spawnSync('pwd', options)

console.log(child.stdout.toString(), child.stderr.toString())

assert.notStrictEqual(child.stdout, null)
assert.notStrictEqual(child.stderr, null)

// 测试ignore的情况
options = { stdio: 'ignore' }
child = spawnSync('pwd', options)

console.log(child.stdout, child.stderr)

assert.strictEqual(child.stdout, null)
assert.strictEqual(child.stderr, null)

// 测试inherit的情况
options = { stdio: 'inherit' }
child = spawn('pwd', [], options)

process.stdout.on('data', (chunk) => {
    console.log(chunk)
})

child.on('exit', (code) => {
    process.exit(code)
})
