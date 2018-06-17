/**
 * fs.appendFile(path, data, [options], callback)
 * file: 文件名或者文件的描述符
 * data: 要添加到文件中的数据
 * options： 添加文件时候的选项, 如果是一个字符串则表示文件的编码
 *  mode：0o666
 *  flag: 默认是a
 *  encoding: 插入的内容的编码
 * callback：插入内容操作结束时候的回调函数
 * 
 * 如果插入的文件不存在会先创建文件再插入
 */
const fs = require('fs')
const assert = require('assert')
const join = require('path').join

const currentFileData = 'ABCD';

const n = 220;
const s = '南越国是前203年至前111年存在于岭南地区的一个国家，国都位于番禺，疆域包括今天中国的广东、' +
          '广西两省区的大部份地区，福建省、湖南、贵州、云南的一小部份地区和越南的北部。' +
          '南越国是秦朝灭亡后，由南海郡尉赵佗于前203年起兵兼并桂林郡和象郡后建立。' +
          '前196年和前179年，南越国曾先后两次名义上臣属于西汉，成为西汉的“外臣”。前112年，' +
          '南越国末代君主赵建德与西汉发生战争，被汉武帝于前111年所灭。南越国共存在93年，' +
          '历经五代君主。南越国是岭南地区的第一个有记载的政权国家，采用封建制和郡县制并存的制度，' +
          '它的建立保证了秦末乱世岭南地区社会秩序的稳定，有效的改善了岭南地区落后的政治、##济现状。\n';

function throwNextTick(e) {
    process.nextTick(() => {
        throw e
    })
}

// 如果文件不存在，就会创建一个文件
{
    const filename = join(__dirname, 'append.txt')

    fs.appendFile(filename, s, (e) => {
        assert.ifError(e)

        // 判断文件的内容是否被添加
        fs.readFile(filename, (e, data) => {
            assert.ifError(e)
            assert.strictEqual(Buffer.byteLength(s), data.length)
        })
    })
}

// 以promise的形式来使用这个接口
{
    const filename = join(__dirname, 'append-promise.txt')

    fs.promises.appendFile(filename, s)
        .then(() => fs.promises.readFile(filename))
        .then(buffer => assert.strictEqual(Buffer.byteLength(s), buffer.length))
        .catch(throwNextTick)
}

// 测试把文件内容添加到非空的文件中去
{
    const filename = join(__dirname, 'append-non-empty.txt')

    fs.writeFileSync(filename, currentFileData)

    fs.appendFile(filename, s, (err) => {
        assert.ifError(err)

        fs.readFile(filename, (err, data) => {
            assert.ifError(err)
            assert.strictEqual(data.toString('utf8').slice(0, 4), currentFileData)
            assert.strictEqual(Buffer.byteLength(s) + currentFileData.length, data.length)
        })
    })
}

// 向一个文件中添加buffer
{
    const filename = join(__dirname, 'append-buffer.txt')

    fs.writeFileSync(filename, currentFileData)
    const buf = Buffer.from(s)

    fs.appendFile(filename, buf, (err) => {
        assert.ifError(err)

        fs.readFile(filename, (err, data) => {
            assert.ifError(err)
            assert.strictEqual(buf.length + currentFileData.length, data.length)
        })
    })
}

// 通过文件描述符来操作文件
{
    const filename = join(__dirname, 'append-fd.txt')
    fs.writeFileSync(filename, currentFileData)

    fs.promises.open(filename, 'a+')
        .then(fd => {
            fs.promises.appendFile(fd, s)
            return fd
        })
        .then(fd => {
            fd.close()         
        })
        .then(fd => {
            return fs.promises.readFile(filename)
        })
        .then(buffer => {
            assert.strictEqual(Buffer.byteLength(s) + currentFileData.length, buffer.length)
        })
        .catch(throwNextTick)
}