/**
 * readable事件将在流中有数据可供读取的时候触发。
 * 在某些情况下，如果给readable事件添加回调，将会导致一些数据被读到内存缓冲区中。
 * 
 * 事实上，readable事件表明的是流到达了一个新的状态。要么是流有了新的数据，要么是流到达了末尾，前者stream.read()
 * 将返回具体的内容，后者会返回null。
 */
const assert = require('assert')

const Readable = require('stream').Readable

{
    const r = new Readable({
        highWaterMark: 3
    })

    r._read = () => {
        console.log('有数据被写入了')
    }
    // 触发readable事件
    r.push(Buffer.from('hello world'))

    setTimeout(() => {
        assert(!r._readableState.reading)
        r.on('readable', () => {
            console.log('可以从流中读取数据了')
            // 会调用内部的_read方法
            r.read()
        })
    })
}

{
    // 非对象模式下push一个非空的字符串将会触发下一次的read
    const underlyingData = ['q', 'x', 'y', 'r', 'z']
    const expected = underlyingData.filter(data => data)
    const result = []

    const r = new Readable({
        encoding: 'utf8'
    })

    r._read = function() {
        process.nextTick(() => {
            if (!underlyingData.length) {
                this.push(null)
            } else {
                this.push(underlyingData.shift())
            }
        })
    }
    
    r.on('readable', () => {
        const data = r.read()
        console.log(`Got the data ${data}`)
        if (data !== null) {
            result.push(data)
        }
    })

    // 触发readable事件
    r.push(underlyingData.shift())

    r.on('end', () => {
        console.log(result, expected)
        assert.deepStrictEqual(result, expected)
    })
}