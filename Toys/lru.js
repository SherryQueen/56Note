function LRU(max, timeout) {
  const map = new Map()

  const isTimeout = (key) => {
    const value = map.get(key)
    if (!value) return true
    return Date.now() - value.time > timeout
  }

  return {
    get: (key) => {
      if (!map.has(key)) return null
      if (isTimeout(key)) {
        map.delete(key)
        return null
      }

      return map.get(key).value
    },

    put: (key, value) => {
      if (map.has(key)) map.delete(key)
      if (map.size === max) {
        // * Map 是有序的, 故最长时间未被访问的值会被第一个迭代到
        map.delete(map.keys().next().value)
      }
      map.set(key, { value, time: Date.now() })
    },
  }
}

const lru = new LRU(3, 1000)
lru.put('a', 1)
lru.put('b', 1)
lru.put('c', 1)
lru.put('d', 1)
lru.put('d', 2)
lru.put('b', 1)

console.log('a', lru.get('a'))
console.log('b', lru.get('b'))
console.log('c', lru.get('c'))
console.log('d', lru.get('d'))

setTimeout(() => {
  console.log('a', lru.get('a'))
  console.log('b', lru.get('b'))
  console.log('c', lru.get('c'))
  console.log('d', lru.get('d'))
}, 500)

setTimeout(() => {
  console.log('a', lru.get('a'))
  console.log('b', lru.get('b'))
  console.log('c', lru.get('c'))
  console.log('d', lru.get('d'))
}, 1000)
