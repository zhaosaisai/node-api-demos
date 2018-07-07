/**
 * 被引入的模块将缓存在这个对象中。
 * 如果从这个对象中将缓存的模块删除，那么在下一次引入的时候会重新加载。
 * 
 * 这个属性是一个对象，其中键的名称就是被缓存的模块的路径。值就是这个模块对应的模块对象。
 */
const main = require('./main')
const test = require('./test')

console.log(require.cache)