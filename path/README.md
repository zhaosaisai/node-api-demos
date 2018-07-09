path模块提供了一些处理文件和目录路径的方法。使用前需要引入：

```js
const path = require('path')
```

path模块的默认操作会根据操作系统的不同而变化。想在posix系统上操作windows的路径可以使用path.win32。同样，如果想在windows系统上操作posix系统上的路径可以使用path.posix。