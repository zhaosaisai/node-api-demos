/**
 * 这个属性包含了创建工作进程的时候主进程的部分配置信息
 * 这个对象也会包含调用setMaster或者fork的时候传递的值
 * 
 * 这个对象一般不建议手动修改
 */
const cluster = require('cluster')


