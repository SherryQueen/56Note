/**
 * @filename    nthUglyNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/ugly-number-ii/
 */

class PriorityQueue {
  constructor() {
    this.queue = []
  }

  // 入队
  enqueue(item) {
    const queue = this.queue
    if (!this.queue.length) {
      queue.unshift(item)
      return
    }

    let target = -1
    for (let i = 0, len = queue.length; i < len; i++) {
      if (item <= queue[i]) {
        target = i
        break
      }
    }
    if (target === -1) queue.push(item)
    else queue.splice(target, 0, item)
  }

  // 优先级最高的出队
  dequeue() {
    return this.queue.shift()
  }

  // 是否为空
  isEmpty() {
    return !this.queue.length
  }

  // 可迭代
  [Symbol.iterator]() {
    let idx = 0
    return {
      next: () => (idx < this.queue.length ? { value: this.queue[idx++], done: false } : { done: true }),
    }
  }
}

/**
 * 因为丑数由特定的数字2,3,5组成.最小的丑数位1.
 * 我们可以通过一个集合记录所有丑数.当我们需要向后寻找更多的丑数的时候,只需要将集合中最小的丑数,乘以质因数, 即可得到更多的丑数.
 * ⚠️注意: 因为 2*2 < 1*5 所以需要考虑丑数的顺序.  4*3 === 2*6 要考虑去重, 避免寻找到重复的丑数
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
  if (n === 1) return 1

  const queue = new PriorityQueue()
  queue.enqueue(1)

  const factory = [2, 3, 5]
  const marked = {} // 避免计算重复值

  for (let i = 1; i < n + 1; i++) {
    const ans = queue.dequeue()
    if (i === n) return ans

    for (const f of factory) {
      const v = ans * f
      if (marked[v]) continue
      marked[v] = true
      queue.enqueue(v)
    }
  }
  return 1
}

console.info(nthUglyNumber(10))
