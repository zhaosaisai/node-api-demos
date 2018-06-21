/**
 * process.exit([code])
 * 这个方法主要以退出码code来结束nodejs的进程，如果code未被提供的话，那么将会以
 * success的状态码为0来退出进程，或者以 process.exitCode属性值来退出进程
 * 进程会在所有的exit事件执行完毕后才会退出
 * 
 * 一般的情况下不要主动的调用这个方法来强制进程退出
 */
 const assert = require('assert')

 switch (process.argv[2]) {
    case 'child1':
        return child1()
    case 'child2':
        return child2()
    case 'child3':
        return child3()
    case 'child4':
        return child4()
    case 'child5':
        return child5()
    case undefined:
        return parent()
 }
 
 function child1() {
     process.exitCode = 42
     process.on('exit', (code) => {
         assert.strictEqual(code, 42)
     })
 }

 function child2() {
     process.exitCode = 99
     process.on('exit', (code) => {
         assert.strictEqual(code, 42)
     })
     process.exit(42)
 }

 function child3() {
     process.exitCode = 99
     process.on('exit', (code) => {
         assert.strictEqual(code, 0)
     })
     process.exit(0)
 }

 function child4() {
     process.exitCode = 99
     process.on('exit', (code) => {
         if (code !== 1) {
             console.log('wrong code! expected 1 for uncaughtException')
             process.exit(99)
         }
     })
     throw new Error('ok')
 }

 function child5() {
     process.exitCode = 95
     process.on('exit', (code) => {
        assert.strictEqual(code, 95)
        process.exitCode = 99
     })
 }

 function parent() {
     const { spawn } = require('child_process')
     const node = process.execPath
     const f = __filename
     const options = {
         stdio: [0, 1, 'ignore']
     }

     const test = (arg, exit) => {
         spawn(node, [f, arg], options).on('exit', (code) => {
             console.log('exit code is ', code)
             assert.strictEqual(code, exit)
         })
     }

     test('child1', 42)
     test('child2', 42)
     test('child3', 0)
     test('child4', 1)
     test('child5', 99)
 }