/**
 * Buffer.alloc(size[, fill [, encoding]])
 * 这个方法主要适用于创建一个指定size的buffer。也可以指定初始的填充数据
 * 默认是通过 0 进行填充
 * 
 * size介于 0 和  buffer.constants.MAX_LENGTH 之间
 */

 const buf = Buffer.alloc(5)

 console.log(buf)
 console.log(buf.toString())

 const buf2 = Buffer.alloc(5, 'helloworld')
 console.log(buf2)
 console.log(buf2.toString())

 const buf3 = Buffer.alloc(5, 'helloworld', 'base64')
 console.log(buf3)
//  不是合法的base64，所以会输出乱码
 console.log(buf3.toString())

 /**
  * 这个方法比Buffer.allocUnsafe()方法慢，但是能保证创建的buffer不会包含敏感数据
  */
  
  // 如果size不是一个数值，会抛出错误
  const buf4 = Buffer.alloc('a')
  console.log(buf4)