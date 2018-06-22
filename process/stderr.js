/**
 * process.stderr是nodejs中的标准错误输出流
 * 它是一个可读可写流
 */
const fork = require('child_process').fork

if (process.argv[2] === 'child') {
    process.stderr.write('A Error\n')
} else {
    const child = fork(__filename, ['child'])
    child.on('data', (chunk) => {
        console.log(chunk.toString())
    })
    child.on('exit', (exitCode) => {
        console.log('Exit')
        process.exit(exitCode)
    })
}