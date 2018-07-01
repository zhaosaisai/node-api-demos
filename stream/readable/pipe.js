/**
 * readable.pipe(destination, [options])
 * 这个方法主要是把可读流定向到可写流中，options接收一个end参数，用来指定在可读流结束的时候是否结束可写流。
 */
const fs = require('fs')

const r = fs.createReadStream('./end.ss')
const w = fs.createWriteStream('./end.ss.bak')

r.on('end', () => {
    console.log(r._readableState.ended)
    process.nextTick(() => {
        // 如果说end设置为false的话，这个属性值也为false
        console.log(w._writableState.ended)
    })
})

r.pipe(w, {
    // end: false
})