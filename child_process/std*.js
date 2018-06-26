/**
 * 我们知道，当我们将stdio设置为pipe的时候，子进程会将其标准输入，标准输出，标准错误输出
 * 导入到父进程中。所以我们可以在父进程中通过
 * subprocess.stdin获取子进程的标准输入对象
 * subprocess.stdout获取子进程的标准输出对象
 * subprocess.stderr获取子进程的标准错误输出对象
 * 
 * 但是如果stdio对应的值不是['pipe', 'pipe', 'pipe']则对应的对象的值为null
 * 
 */
const assert = require('assert')
const spawn = require('child_process').spawn

function createSub(options, command = 'ls') {
    if (command === 'ls') {
        return spawn('ls', [__filename], options)
    } else {
        return spawn(command, options)
    }
}

{
    const child = createSub({
        stdio: 'pipe'
    })

    assert(child.stdin, 'child.stdin is null')
    assert(child.stdout, 'child.stdout is null')
    assert(child.stderr, 'child.stderr is null')
}

{
    const child = createSub({
        stdio: ['ignore', 'pipe', 'pipe']
    })

    assert.strictEqual(child.stdin, null)
    assert(child.stdout, 'child.stdout is null')
    assert(child.stderr, 'child.stderr is null')
}

{
    // 获取子进程的输入
    const child = createSub({
        stdio: 'pipe'
    })

    child.stdout.on('data', chunk => {
        console.log(`Got the data from child ${chunk}`)
    })

    child.stderr.pipe(process.stderr)
}

{
    // 获取子进程的输入
    const child = createSub({
        stdio: 'pipe'
    }, 'cat')

    process.stdin.pipe(child.stdin)

    child.stdout.on('data', chunk => {
        console.log(`Got the data from child ${chunk}`)
    })

    child.stderr.pipe(process.stderr)
}