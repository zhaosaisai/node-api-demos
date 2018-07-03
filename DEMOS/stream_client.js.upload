const http = require('http')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const zlib = require('zlib')

const file = process.argv[2]
const server = process.argv[3] || 'localhost'

if (!file) {
    console.log('请输入需要上传的文件的路径')
    process.exit(1)
}

const options = {
    hostname: server,
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        filename: path.basename(file),
        'content-type': 'application/octet-stream',
        'content-encoding': 'gzip'
    }
}

const req = http.request(options, res => {
    console.log('Got the response ', res.statusCode)
})

// 发送到服务器
fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipher('aes192', 'a_shared_secret'))
    .pipe(req)
    .on('finish', () => {
        console.log(`${file} 上传完毕`)
    })