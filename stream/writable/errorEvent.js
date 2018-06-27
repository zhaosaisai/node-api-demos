/**
 * 当写入数据或者使用管道出错的时候就会触发error事件。
 * 监听器的回调函数被调用的时候回传入一个Error实例作为参数。
 * 当这个事件被触发的时候，流还处于未关闭状态。
 */

const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    const writer = fs.createWriteStream('./http.txt')

    req.pipe(writer)

    req.on('end', () => {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end('<div>hello boy</div>')
    })

    // 设置一个错误监听器，在错误发生的时候捕获错误
    writer.on('error', err => {
        console.log('Error happened', err)
    })
}).listen(8080)