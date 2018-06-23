const assert = require('assert')
const exec = require('child_process').exec

exec('ls').stdout.on('data', chunk => {
    console.log(chunk)
})

exec('jjjj').stderr.on('data', chunk => {
    console.log(chunk)
})