/**
 * 所有的工作进程都是通过process.fork方法来创建的，这个方法返回的对象被保存在worker.process
 * 属性中。我们可以通过这个属性来获取工作进程的process对象
 * 
 * 需要注意：当process上发生 'disconnect'事件，并且.exitedAfterDisconnect的值不是true时，工作进程会调用 process.exit(0)。
 */
