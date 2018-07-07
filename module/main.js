/**
 * 当一个文件通过Nodejs直接执行的时候，他的require.main属性就指向当前的module。
 * 我们可以通过require.main === module来判断一个模块是不是可以直接被运行的。
 * 
 * 除此，我们也可以通过require.main.filename来获取到入口文件的路径
 */

 const test = require('./test')

 if (require.main === module) {
     console.log('这个是主模块')
 }

 test()