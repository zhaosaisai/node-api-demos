/**
 * process.umask([mask])
 * 类似于linux中的umask命令，用于设置默认的创建文件时候的权限掩码。
 * 如果不传递参数，则返回默认的权限掩码。
 * 如果传递了参数，创建文件掩码就被设置为参数值，并且返回之前的掩码。
 */
const newmask = 0o022;
const oldmask = process.umask(newmask);

console.log(
  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`
);