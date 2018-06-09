/**
 * http.get(options, [callback])
 * 这个方法主要是用于发送一个http的get请求
 * 
 * 第一个参数可以是一个url描述对象，也可以是一个url字符串。返回的实例是http.ClientRequest实例。
 * 这个方法会自动调用req.end()，同时这个方法必须消费response。
 * 所以我们要么指定callback回调函数，要么监听response事件。
 * 因为如果没有进行上面的两个处理，则整个响应就会被丢弃。
 * 
 * 如果监听了response事件，就必须消耗完响应对象的数据，可以通过调用
 * response.read()或者监听data事件或者调用response.resume()方法
 * 当数据被消耗完的时候，就会触发end事件。在数据读取完之前会消耗内存
 * 
 * 这个实例实现了可写流的接口
 */

 const http = require('http')

 http.get('http://nodejs.org/dist/index.json', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('请求失败。\n' +
                      `状态码: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('无效的 content-type.\n' +
                      `期望 application/json 但获取的是 ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消耗响应数据以释放内存
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`错误: ${e.message}`);
});