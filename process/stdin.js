/**
 * process.stdin是nodejs提供的标准输入流，
 */
process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk === 'end\n') {
        return process.stdin.end()
    }
    if (chunk !== null) {
        process.stdout.write(`data: ${chunk}`)
    }
})

process.stdin.on('end', () => {
    process.stdout.write('end')
})