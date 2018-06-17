/**
 * fs.fsync(fd, callback)
 * 这个方法主要是用于同步磁盘缓存
 */
const fs = require('fs')

fs.open('README.md', 'a', (err, fd) => {
    if (err) {
        throw err
    }
    console.log('File opened')
    fs.fsync(fd, (err) => {
        if (err) {
            throw err
        }
        console.log('Sync done')
        fs.close(fd, (err) => {
            if (err) {
                throw err
            }
            console.log('File closed')
        })
    })
})