## url模块

`url`模块提供了一些实用的方法用于处理和解析`url`。使用前需要引入：

```js
const url = require('url')
```

Nodejs中的url模块有两种模式：一个是Node.js特有的API，是旧版本的遗留；另一个则是实现了WHATWG URL Standard的 API ，该标准也在各种浏览器中被使用。

- 利用WHATWG API解析一个URL字符串:

```js
const { URL } = require('url');
const myURL =
  new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```

- 通过Node.js提供的API解析一个URL:

```js
const url = require('url');
const myURL =
  url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```