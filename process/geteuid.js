/**
 * process.geteuid
 * 这个方法用于获取执行nodejs程序的有效用户身份的数字标识
 * 
 * 有效用户ID（euid）是你最初执行程序时所用的ID 表示该ID是程序的所有者   
 * 真实用户ID（uid）是程序执行过程中采用的ID 该ID表明当前运行位置程序的执行者   
 * 举个例子   
 * 程序myprogram的所有者为501/anna   
 *  以501运行该程序此时uid和euid都是501   
 *  但是由于中间要访问某些系统资源   
 *  需要使用root身份 
 *  此时uid为0而euid仍是501
 */


console.log(process.geteuid())