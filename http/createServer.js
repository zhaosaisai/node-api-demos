/**
 * 创建一个http服务器，回调的第一个参数req是客户端请求，第二个参数是服务端响应
 * req是http.IncomingMessage的实例
 * res是http.ServerResponse的实例 
 * 
 * 返回的是一个http.Server实例
 * 
 * 回调函数也可以看作server的request事件的事件处理器
 */