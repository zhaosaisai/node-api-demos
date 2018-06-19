/**
 * message主要用于在进程间通信的时候接收对方进程的消息
 * 这种进程通常是通过ipc来创建的
 * 
 * 这个事件的回调函数接收两个参数
 *  message：解析之后的对象或原始值
 *  sendHandle: <net.Server> | <net.Socket> 一个 net.Socket 或 net.Server 对象，或 undefined。
 */

 const { fork } = require('child_process')
 const questions = ['age', 'sex', 'hi']
 let index = 0
// 创建子进程
if (process.argv[2] === 'child') {
    // 监听父进程发送过来的数据
    process.on('message', (message = {}) => {
        console.log(`Child got the parent message`)
        console.log(JSON.stringify(message, null, 2))

        if (message === 'age') {
            process.send(24)
        } else if (message === 'sex') {
            process.send('male')
        } else {
            process.send('You can ask me of age or sex')
        }
    })

    process.send('Ask me something')
} else {
    // 父进程/主进程程序
    const child = fork(process.argv[1], ['child'])

    // 监听子进程发送过来的数据
    child.on('message', (message) => {
        console.log(message)
        if (message === 'Ask me something' || message !== 'You can ask me of age or sex') {
            child.send(questions[index++])
        } else {
            console.log(message)
            process.exit(0)
        }
    })

    process.on('exit', (code) => {
        console.log(`${code === 0 ? '正常' : '不正常'}退出`)
    })
}