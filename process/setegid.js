/**
 * process.setegid(id)
 * id可以是字符串或者数字，用来设置一个用户组名或者用户的组id
 * 如果传递的是一个字符串的话，那么就会通过阻塞的方式解析出对应的组id
 * 
 * process.setgid(id)
 * process.seteuid(id)
 * process.setuid(id)
 * 都可以通过这种方式来设置，接收的参数的类型是一样的
 */

 if (process.getegid && process.setegid) {
    console.log(`Current gid: ${process.getegid()}`)
    
    try {
        process.setegid(501)
        console.log(`New gid: ${process.getegid()}`)
    } catch(e) {
        console.log('Fail to set gid', e)
    }
 }