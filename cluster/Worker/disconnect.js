/**
 * 当我们在一个工作进程内调用这个方法会关闭所有的server，并等待这些server的close事件然后退出。
 * 在主进程内，会给工作进程发送一个消息，导致工作进程自身调用disconnect()方法。
 * 
 * 工作进程并不会等待客户端的连接关闭，disconnect方法在退出前并不会等待客户端的关闭。
 */

 const cluster = require('cluster')
 const net = require('net')

 if (cluster.isMaster) {
    const worker = cluster.fork()
    let timer = null

    worker.on('listening', address => {
        console.log(`worker is listening ${address.port}`)
        worker.send('shutdown')
        worker.disconnect()

        timer = setTimeout(() => {
            worker.kill()
        }, 2000)
    })

    worker.on('disconnect', () => {
        console.log('disconnect 事件发生了')
        clearTimeout(timer)
    })
 } else {
     const server = net.createServer(socket => {})

     server.on('close', () => {
         console.log('服务器关闭了')
     })

     server.listen(8000)

     process.on('message', msg => {
         if (msg === 'shutdown') {
             server.close()
         }
     })
 }