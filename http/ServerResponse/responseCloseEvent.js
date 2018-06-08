/**
 * 只定义了close事件，这个事件的产生是当客户端非正常关闭所产生的，res.end 不会造成close事件。
 */

/**
 * 运行服务器，通过浏览器访问localhost:3000 ，
 * 由于没有res.end() 代码，所以浏览器始终处于等待数据状态，
 * 这时关闭浏览器，服务器终端就有打印出close。
 */
const http = require('http')

const server = http.createServer((req, res) => {
    res.on("close",() => {
        console.log("close")
    })
})

server.listen(3000)
