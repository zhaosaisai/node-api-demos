#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, process.argv[2])

fs.readdir(filePath, (err, dir) => {
    if (err) {
        throw err
    }
    (dir || []).forEach((f) => {
        if (f.startsWith('_') && f.endsWith('.js')) {
            fs.renameSync(`${filePath}/${f}`, `${filePath}/${f.slice(1)}`)
        }
    })
})

