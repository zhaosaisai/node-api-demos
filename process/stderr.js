/**
 * process.stderr是nodejs中的标准错误输出流
 * 它是一个可读可写流
 */
const fork = require('child_process').fork

if (process.argv[2] === 'child') {
    process.stderr.write('A Error')
} else {
    const child = fork(__dirname, ['child'])
    child.on('data', (chunk) => {
        console.log(chunk.toString())
    })
}