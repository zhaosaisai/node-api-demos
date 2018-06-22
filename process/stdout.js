/**
 * process.stdout是nodejs提供的标准输出流
 */

 let num1
 let num2

 process.stdout.write('请输入num1的值：\n')

 process.stdin.setEncoding('utf8')

 process.stdin.on('data', (chunk) => {
     if (!num1) {
         num1 = Number(chunk)
         process.stdout.write('请输入num2的值：\n')
     } else {
         num2 = Number(chunk)
        process.stdout.write(`${num1} + ${num2} = ${num1 + num2}`)
        setImmediate(() => {
            process.stdin.end()
        })
     }
 })