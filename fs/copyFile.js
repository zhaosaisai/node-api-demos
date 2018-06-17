/**
 * fs.copyFile(src, dest, [flag], callback)
 * 异步的将src拷贝到dest
 * src：要拷贝的源文件的名称
 * dest：拷贝目录的目标文件名称
 * flag：拷贝操作符
 * callback：拷贝完成时候的回调函数
 * 
 * 如果拷贝的dest已经存在，那么已经存在的文件就会被覆盖
 * 如果在拷贝过程中目标文件打开出错，那么node将会尝试删除它
 * 
 * flag是一个可选的整数，表示拷贝的行为，目前可用的是fs.constants.COPYFILE_EXCL
 * 这个值表示如果目标文件已经存在，则会拷贝失败
 */

 const fs = require('fs')
 const assert = require('assert')
 const path = require('path')

 const { COPYFILE_EXCL } = fs.constants
 const src = path.resolve(__dirname, 'README.md')
 const dest = path.resolve(__dirname, 'copy.bak')

//  验证文件是不是相同的
 function verify(src, dest) {
     const srcData = fs.readFileSync(src, 'utf8')
     const srcStat = fs.statSync(src)
     const destData = fs.readFileSync(dest, 'utf8')
     const destStat = fs.statSync(dest)
     
     assert.strictEqual(srcData, destData)
     assert.strictEqual(srcStat.mode, destStat.mode)
     assert.strictEqual(srcStat.size, destStat.size)
 }

//  验证如果目标文件存在了，复制的时候是否会报错
// 默认的情况下是不会报错的
{
    fs.writeFileSync(dest, '', 'utf8')
    const result = fs.copyFileSync(src, dest)
    assert.strictEqual(result, undefined)
    verify(src, dest)
}

{
    fs.writeFileSync(dest, '看看这个内容是否会被覆盖', 'utf8')
    const result = fs.copyFileSync(src, dest)
    assert.strictEqual(result, undefined)
    verify(src, dest)
}

// 下面的这种形式复制文件的时候就会报错
{
    fs.copyFile(src, dest, COPYFILE_EXCL, (err) => {
        assert.ok(err instanceof Error)
    })
}