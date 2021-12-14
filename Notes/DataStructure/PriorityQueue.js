/**
 * 优先队列
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
      if (item >= queue[i]) {
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

const pq = new PriorityQueue()
pq.enqueue(1)
pq.enqueue(13)
pq.enqueue(3)
pq.enqueue(31)
pq.enqueue(3)
pq.enqueue(22)

for (const item of pq) {
  console.info('item', item)
}

console.log(pq.dequeue()) // 31
console.log(pq.dequeue()) // 22
console.log(pq.dequeue()) // 13
console.log(pq.dequeue()) // 3
console.log(pq.dequeue()) // 3
console.log(pq.dequeue()) // 1
