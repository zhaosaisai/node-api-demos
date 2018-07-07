/**
 * 想要获得调用 require() 时加载的确切的文件名，使用 require.resolve() 函数。
 * 这个方法接收两个参数，第一个参数就是需要被解析的模块的文件路径，第二个参数是一个选项对象。
 * 这个对象的paths属性指定了模块解析的起点。
 * 
 * 这个方法只返回解析后的模块的路径，并不会真正的来加载这个模块。
 */
console.log(require.resolve(__filename))

console.log(require.resolve('./test'))