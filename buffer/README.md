在ES6的`TypedArray`之前，javascript语言是没有读取或操作二进制的能力。`Buffer`类赋予了Node操作二进制数据流的能力。
`Buffer`的大小是固定的、且在v8堆外分配物理内存。`Buffer`的大小在被创建的时候确定，而且是无法调整的。

下面是一些常见的例子：

```js
// 创建一个长度为10， 而且用 0 填充的buffer
const buf1 = Buffer.alloc(10)

// 创建一个长度为 10，而且使用 0x1 填充的Buffer
const buf2 = Buffer.alloc(10, 1)

// 创建一个长度为10，但是未初始化的Buffer
// 这个方法比调用 Buffer.alloc()更快
// 暗示返回的Buffer可能会包含旧数据
// 因此需要使用fill或者rewrite重写
const buf3 = Buffer.allocUnsafe(10)

// 创建一个包含[0x1, 0x2, 0x3]的Buffer
const buf4 = Buffer.from([1, 2, 3])
```