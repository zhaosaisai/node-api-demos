/**
 * URLSearchParams提供了对query部分的读写权限。
 * 这个接口和querystring模块的功能比较类似，但是querystring模块的功能更加的通用。
 * 因为他可以定制化分隔符。
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 // 根据一个查询字符串创建一个对象
//  如果string是以?开头的，则?将会被忽略
 const params = new URLSearchParams('user=abc&query=xyz')

 console.log(params.get('user'))
 console.log(params.toString())

 const params2 = new URLSearchParams('?user=abc&query=xyz')
 console.log(params2.get('user'))
 console.log(params2.toString())
 
 assert.strictEqual(params.toString(), params2.toString())