/**
 * path.normalize(path)
 * 这个方法主要是用于规范化一个路径的
 * 当发现多个连续的路径分隔符时（如 POSIX 上的 / 与 Windows 上的 \ 或 /），它们会被单个的路径分隔符（POSIX 上是 /，Windows 上是 \）替换。 末尾的多个分隔符会被保留。
 */

 const path = require('path')

 console.log(path.normalize('/foo/bar//baz/asdf/quux/..'))