/**
 * writable.uncork()这个方法将输出在stream.cork()被调用之后缓存在内存中的所有数据
 * 如果我们是通过writable.cork和writable.uncork方法来管理内存，建议使用process.nextTick方法
 * 来调用writable.uncork，因为通过这种方法可以对一次事件循环中所有的write方法写入的数据进行管理
 * 
 * 我们调用了多少次cork就需要调用多少次的uncork方法
 */

//  具体例子参考 cork.js