/**
 * 这个方法主要是用于排序查询字符串中的键值对的
 */

const { URLSearchParams } = require('url')

const params = new URLSearchParams('query[]=abc&type=search&query[]=123')

params.sort()
console.log(params.toString())

