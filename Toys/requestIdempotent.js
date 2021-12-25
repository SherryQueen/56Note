const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))

const requestIdempotent = (fn, opt = {}) => {
  const memory = {}
  const timeout = typeof opt.timeout === 'undefined' ? -1 : opt.timeout
  const ignoreQuery = typeof opt.ignoreQuery === 'undefined' ? false : opt.ignoreQuery

  return async (...args) => {
    const key = ignoreQuery ? 'ignoreQuery' : JSON.stringify(args)

    const startFetch = async () => {
      const ans = {
        loading: true,
        promise: fn.call(null, args),
        timeout,
        startTime: 0,
      }
      memory[key] = ans

      const data = await ans.promise
      ans.loading = false
      ans.startTime = Date.now()
      return data
    }

    const ans = memory[key]
    if (!ans) return startFetch()
    if (ans.loading) return ans.promise
    if (ans.timeout === -1 || Date.now() - ans.startTime <= timeout) return ans.promise
    // * Restart request
    return startFetch()
  }
}

const fun1 = async (query) => {
  await sleep(1000)
  console.log('exec fun1 once')
  return `result of fun1(${query})`
}

const fun2 = async (query) => {
  await sleep(1000)
  console.log('exec fun2 once')
  return `result of fun2(${query})`
}

const fn1 = requestIdempotent(fun1)
const fn2 = requestIdempotent(fun2)

const test = async () => {
  let data
  data = await Promise.all([fn1('1'), fn1('1'), fn1('2'), fn2('1')])
  console.log('data', data)
  await sleep(2000)
  data = await fn1('1')
  console.log('data', data)
}

test()
