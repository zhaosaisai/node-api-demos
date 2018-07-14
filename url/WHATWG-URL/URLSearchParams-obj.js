/**
 * URLSearchParams(obj)
 * obj是一个表示键值对集合的对象
 * 通过使用查询哈希映射实例化一个新的URLSearchParams对象，obj的每一个属性的键和值将被强制转换为字符串。
 * 
 * 请注意: 和 querystring 模块不同的是, 在数组的形式中，重复的键是不允许的。数组使用array.toString()进行字符串化时，只需用逗号连接所有的数组元素即可。
 */

 const { URLSearchParams } = require('url')

 const params = new URLSearchParams({
     name: 'abc',
     query: ['first', 'second'],
    //  query: 'name'
 })

 console.log(params.getAll('query'))
 console.log(params.toString())
