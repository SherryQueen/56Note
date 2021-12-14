const tasks = [(i, next) => next(i), (i, next) => next(i * 2), (i, next) => next(i + 3)]

function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  if (middleware.some((m) => typeof m !== 'function')) throw new TypeError('Middleware must be composed of functions!')
  return function (ctx, next) {
    const dispatch = (idx) => {
      const fn = idx >= middleware.length ? next : middleware[idx] // 判断是否还有中间件. 如果没有,则使用next函数作为尾函数
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, idx + 1))) // 下标+1, 将当前的结果值作为下一个中间件的入参
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}

compose(tasks)(1, (i) => {
  console.info('result', i)
})
