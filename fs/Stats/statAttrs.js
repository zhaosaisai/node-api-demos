/**
 * 下面是stat对象的一些属性信息
 */
const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, './README.md')

fs.stat(file, (err, stat) => {
    // dev 返回文件设备的数值型标识
    console.log(`dev is ${stat.dev}`)
    // info 文件系统特定的文件索引结点数值
    console.log(`info is ${stat.info}`)
    // mode 文件类型和模式的类域
    console.log(`mode is ${stat.mode}`)
    // nlink 文件的硬链接数量
    console.log(`nlink is ${stat.nlink}`)
    // uid 文件所有者的数值型标识
    console.log(`uid is ${stat.uid}`)
    // gid 文件所属组的数值型标识
    console.log(`gid is ${stat.gid}`)
    // rdev 如果文件是一个特殊文件，则返回数值型的设备标识。
    console.log(`rdev is ${stat.rdev}`)
    // size 文件的字节的大小
    console.log(`size is ${stat.size}`)
    // blksize 文件系统用于 I/O 操作的块大小。
    console.log(`blksize is ${stat.blksize}`)
    // blocks 分配给文件的块的数量
    console.log(`blocks is ${stat.blocks}`)
    // atimeMs 文件最后一次被访问的时间戳
    console.log(`atimeMs is ${stat.atimeMs}`)
    // mtimeMs 文件最后一次被修改的时间戳
    console.log(`mtimeMs is  ${stat.mtimeMs}`)
    // ctimeMs 文件状态最后一次被改变的时间戳
    console.log(`ctimeMs is ${stat.ctimeMs}`)
    // birthtimeMs 文件被创建时候的时间戳
    console.log(`birthtimeMs is ${stat.birthtimeMs}`)
    // atime 文件最后一次被访问的时间
    console.log(`atime is ${stat.atime}`)
    // mtime 文件最后一次被修改的时间
    console.log(`mtime is ${stat.mtime}`)
    // ctime 文件的状态最后一次被改变的时间
    console.log(`mtime is ${stat.ctime}`)
    // birthtime 文件被创建的时间
    console.log(`birthtime is ${stat.birthtime}`)
})