/**
 * os.endianness()
 * 表明的是nodejs二进制编译环境的顺序
 * 
 * 'BE'大端模式
 * 'LE'小端模式
 * Big-Endian(大端模式)：就是将数字高位字节放在内存的低地址，数字低字节放在内存的高地址
 * Little-Endian(小端模式)：就是将数字高位字节放在内存的高地址，数字低字节放在内存的低地址
 */

 console.log(require('os').endianness())