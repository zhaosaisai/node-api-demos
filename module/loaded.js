/**
 * module.loaded
 * 这个属性表示的是文件是否已经加载完毕或者正在加载中
 */
console.log(module.loaded)

process.nextTick(() => {
    console.log(module.loaded)
})