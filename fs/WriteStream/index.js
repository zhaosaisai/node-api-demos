const fs = require('fs')
const path = require('path')
const assert = require('assert')

const file = path.resolve(__dirname, './write.txt')

{
    const stream = fs.createWriteStream(file)

    stream.on('drain', () => {
        assert.fail('\'drain\' event must not be emitted before ' +
                'stream.write() has been called at least once.');
    })

    stream.destroy()
}

// 如果写入的文件不是一个buffer，会报错
{
    const stream = fs.createWriteStream(file)

    stream._write(23, null, () => {
        
    })

    stream.destroy()
}