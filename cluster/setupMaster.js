/**
 * 这个方法主要是用于修改fork的默认行为。一旦调用将会按照cluster.settings进行设置
 * 所有的设置都只对后面的fork生效，并不会对之前的fork产生任何影响
 * 上述的默认值只在第一次调用时有效，当后续调用时，将采用cluster.setupMaster()调用时的当前值。
 */
const cluster = require('cluster')

cluster.setupMaster({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true
})
cluster.fork() // https worker

cluster.setupMaster({
  exec: 'worker.js',
  args: ['--use', 'http']
})
cluster.fork() // http worker
