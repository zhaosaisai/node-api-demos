/**
 * assert.rejects(block[, error][, message])
 * 
 * 这个方法和assert.doesNotReject方法相反
 * 
 * 如果 block 是一个函数且同步地抛出一个错误，则 assert.rejects() 会返回一个被 reject 的 Promise 并传入该错误。 如果该函数没有返回一个 promise，则 assert.rejects() 会返回一个被 reject 的 Promise 并传入 ERR_INVALID_RETURN_VALUE 错误。 以上两种情况都会跳过错误处理函数。
 */