/**
 * os.networkInterfaces()
 * 这个方法返回一个对象，包含了只有被赋予网络地址的网络接口
 * 
 * 返回的对象中包含如下属性：
 *  assress: ip地址
 *  netmask: 子网掩码
 *  family：IPV4 或者 IPV6
 *  mac：网口或者mac地址
 *  internal：
 */

 console.log(JSON.stringify(require('os').networkInterfaces(), null, 4))