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

比较推崇的创建`Buffer`的方式：

`Buffer.from(array)`：返回一个新建的，包含所提供的字节数组的副本。
`Buffer.from(buffer)`：返回一个新建的，包含所提供的buffer副本的buffer。
`Buffer.from(string, [encoding])`：返回一个新建的，包含所提供字符串副本的buffer
`Buffer.alloc(size[,fill [,encoding] ])`：返回一个新建的指定大小的也可以指定填充数据的bugger。
`Buffer.allocUnsafe(size)`：返回一个指定size的buffer。内容必须被初始化，可以使用buf.fill(0)来填充数据。

如果 size 小于或等于 Buffer.poolSize 的一半，则 Buffer.allocUnsafe() 返回的 Buffer 实例可能会被分配进一个共享的内部内存池。

### 是什么令 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() 不安全？

当调用 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() 时，被分配的内存段是未初始化的（没有用 0 填充）。 虽然这样的设计使得内存的分配非常快，但已分配的内存段可能包含潜在的敏感旧数据。 使用通过 Buffer.allocUnsafe() 创建的没有被完全重写内存的 Buffer ，在 Buffer 内存可读的情况下，可能泄露它的旧数据。

虽然使用 Buffer.allocUnsafe() 有明显的性能优势，但必须额外小心，以避免给应用程序引入安全漏洞。