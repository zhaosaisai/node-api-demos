/**
 * 当一个Promise被rejected了，但是这个promise在下次的事件循环及之后的时间里又被重新捕获了
 * 就会触发rejectionHandled事件
 * 
 * 这个事件的事件回调函数接受被rejected的promise作为唯一的参数
 * 
 * 这个事件最佳的处理时机是在unhandledRejection事件触发的时候，可以在这个事件被触发的时候
 * 给被rejected的promise添加一个事件处理器
 */
 const p = (new Promise((resolve, reject) => {
     reject(new Error('Error from promise by reject'))
 }))

 process.on('uncaughtException', (e) => {
     console.error('UE: Catch in process', e)
 })

 process.on('unhandledRejection', (e) => {
     console.info('UR: Catch in process', e)
 })

 process.on('rejectionHandled', (pro) => {
    console.log(pro === p)
    console.info('RH:Catch in process', p);
 })

//  下面的setTimeout会被加到下次的事件循环中，我们可以在这里处理被rejected的promise
setTimeout(() => {
    p.catch((e) => {
        console.error('Catch in promise', e)
    })
}, 1e3)