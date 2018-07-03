const http = require('http')
const path = require('path')
const zlib = require('zlib')
const crypto = require('crypto')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const filename = req.headers.filename
    console.log('is uploading file ', filename)

    req
        .pipe(crypto.createDecipher('aes192', 'a_shared_secret'))
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(`${filename}.upload`))
        .on('finish', () => {
            res.writeHead(201, {
                'content-type': 'text/plain'
            })
            res.end('文件上传完毕')
            console.log('File is saved')
        })
})

server.listen(3000, () => {
    console.log('Server listening 3000')
})