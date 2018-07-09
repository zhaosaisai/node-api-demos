/**
 * path.format(pathObject)
 * 这个方法主要是根据一个路径对象来生成一个路径。这个方法和path.parse相对
 * 
 * pathObject可以包含如下属性：
 *  dir <string>
 *  root
 *  name
 *  ext
 *  base
 * 
 * 当 pathObject 提供的属性有组合时，有些属性的优先级比其他的高：
 *  如果提供了 pathObject.dir，则 pathObject.root 会被忽略
 *  如果提供了 pathObject.base 存在，则 pathObject.ext 和 pathObject.name 会被忽略
 */

 const path = require('path')

 const p1 = path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt'
 })

 console.log(p1)

 const p2 = path.format({
    root: '/',
    base: 'file.txt',
    ext: 'ignored'
  })

  console.log(p2)

  const p3 = path.format({
    root: '/',
    name: 'file',
    ext: '.txt'
  })

  console.log(p3)