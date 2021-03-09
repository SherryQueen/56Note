function curry(fn, ...initArgs) {
  return function (...args) {
    const _args = [...initArgs, ...args]
    return _args.length >= fn.length ? fn.apply(this, _args) : curry.call(this, fn, ..._args)
  }
}

const add = curry(function (a, b, c) {
  return a + b + c
})

console.info(add(1)(2)(3))
