/**
 * readable.wrap(stream)
 * 这个参数接收一个老版本的stream
 * Node.js在v0.10版本之前的流没有实现当前定义的所有流模块的API.
 * 当使用老版本的Node.js库来触发'data'事件和stream.pause()方法仅是建议性的， 
 * readable.wrap()方法能创建一个把老版本的流作为数据源的[Readable][] stream。
 */