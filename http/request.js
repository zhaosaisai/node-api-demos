/**
 * http.request(options, [callback])
 * 这个方法主要是用于发起http请求，请求的方法主要是通过 options的method选项进行指定
 * 具体的选项设置请参考：http://nodejs.cn/api/http.html
 * 
 * options 可以是一个对象、或字符串、或 URL 对象。 如果 options 是一个字符串，
 * 它会被自动使用 url.parse() 解析。 如果它是一个 URL 对象, 它会被默认转换成一个 options 对象。
 * 
 * 这个方法的返回值也是http.ClientRequest的实例对象
 * 
 * 这个实例对象实现了可写流，如果我们进行post请求，可以向这个流中写入数据
 * 
 * 同样的，我们需要监听response事件或者指定回调函数
 * 
 * 当我们使用http.request方法发送http请求的时候，必须调用end方法来表明请求的结束，即使我们没有在主体中
 * 写入任何的数据
 */

 const http = require('http')

 const postData = querystring.stringify({
    'msg' : 'Hello World!'
  });
  
  const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    /** 
     * 有几个请求header我们需要注意：
     * Connection: keep-alive告诉服务器连接会一直持续到下次请求
     * 
     * Content-length会禁用默认的编码
     * 
     * 发送Expect请求头会立即的发送请求头，当我们发送Expect: 100-continue的时候需要指定超时和continue事件的监听器
     * 
     * 发送Authorization请求头会代替auth选项进行基本的认证
    */
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
      console.log('响应中已无数据。');
    });
  });

  /**
   * 一般我们都需要监听这个错误事件，比如DNS解析错误，TCP级的错误或者实际的http解析的错误。都会触发这个事件
   * 所以我们可以在事件监听器中处理这些错误
   */
  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
  
  // 写入数据到请求主体
  req.write(postData);
  req.end();