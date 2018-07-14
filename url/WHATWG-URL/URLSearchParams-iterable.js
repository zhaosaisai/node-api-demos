/**
 * 我们也可以根据一个iterable来创建一个URLSearchParams对象。
 */

 const { URLSearchParams } = require('url')
 const assert = require('assert')

 const iterable = [
     ['name', 'abc'],
     ['first', 'aaa'],
    //  ['second', 'bbb', 'ccc'] // 这种形式会导致创建时候的错误
 ]

 const params = new URLSearchParams(iterable)

 console.log(params.toString())

 assert.strictEqual(params.get('name'), 'abc')
 