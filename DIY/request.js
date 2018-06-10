/**
 * DO IT YOURSELF
 * 
 * Create a simple http request library
 */

 const http = require('http')
 const https = require('https')
 const Url = require('url')
 const querystring = require('querystring')
 
 module.exports = request

 const assign = Object.assign

 function request(url, options) {
    if (url && typeof url === 'object') {
        url = options.url
    }

    if (options.data) {
        let data = querystring.stringify(data)
        assign(options.headers, {
            'Content-Length': Buffer.byteLength(data)
        }, {
            'Content-Type': options.form ? 'application/www-x-form-urlencoded' : 'application/json'
        })
    }

    combineOptions(url, options)
 }

 function combineOptions(url, options) {
    const opts = Url.parse(url)
    // 处理查询字符串
    if (options.params) {
        if (opts.search) {
            url = url.split(opts.search).join(`${opts.search}&${querystring.stringify(options.params)}`)
        } else {
            url += `?${querystring.stringify(options.params)}`
        }
        // 删除params选项
        delete options.params
    }
    
    // 处理代理
    if (options.proxy) {
        // proxy就是代理服务器的域名
        if (!/http(s?)/i.test(options.proxy)) {
            options.proxy = opts.protocol + '//' + options.proxy
        }
        const proxies = Url.parse(options.proxy)
        options.host = proxies.hostname
        options.port = proxies.port
        options.path = url
        options.headers = assign({}, options.headers, {
            Host: opts.hostname
        })
        // 删除代理的选项
        delete options.proxy
    } else {
        // 处理其他选项--url中的优先级较高
        if (opts.hostname) options.hostname = opts.hostname
        if (opts.port) options.port = opts.port
        if (opts.protocol) options.protocol = opts.protocol
        if (opts.path) options.path = opts.path
        if (opts.auth) options.auth = opts.auth
    }
 }