/**
 * 当接收到父进程或者子进程发送过来的消息的时候就会触发这个事件
 */

 const assert = require('assert')
 const spawn = require('child_process').spawn

 const MSG = {
     time: 'love with node'
 }

 if (process.argv[2] === 'child') {
    // 监听父进程发送过来的事件
    process.on('message', msg => {
        console.log('Got the message from parent ', msg)
    })

    setTimeout(() => {
        // 向父进程发送消息
        process.send('end')        
    }, 1000)
 } else {
    const child = spawn(process.execPath, [__filename, 'child'], {
        stdio: [0, 1, 2, 'ipc']
    })

    child.send(MSG)

    // 监听子进程发送过来的事件
     child.on('message', msg => {
         if (msg === 'end') {
            //  断开
            child.disconnect()
         }
     })

     child.on('disconnect', () => {
        console.log(`Child disconnect`)
     })

     child.on('close', (code) => {
        console.log(`Child close ${code}`)
     })

     child.on('exit', (code) => {
        console.log(`Child exit ${code}`)
     })
 }