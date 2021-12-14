/**
 * 堆排序
 * 根据堆的性质, 我们可知,其顶点值, 一定是当前最大(最小)的值.
 * 1. 设定变量 ans (当前堆[1 -> ans]的尾部值)
 * 2. 交换顶点 和 ans 保证尾部的值是最值
 * 3. 重新构建 [1 -> ans-1]的堆
 * 4. 重复 2-3. 直到 ans === 1 停止
 */
function heap(nums) {
  const heap = [...nums]

  // 堆调整
  function heapify(i) {
    if (i >= heap.length) return
    const [l, r] = [i * 2 + 1, i * 2 + 2]
    if (heap[l] !== undefined && heap[i] > heap[l]) {
      ;[heap[i], heap[l]] = [heap[l], heap[i]]
      heapify(l)
    }
    if (heap[r] !== undefined && heap[i] > heap[r]) {
      ;[heap[i], heap[r]] = [heap[r], heap[i]]
      heapify(r)
    }
  }

  // 堆构建
  function buildMinHeap() {
    for (let i = (heap.length / 2) | 0; i >= 0; i--) heapify(i)
  }

  // 对排序
  function sort() {
    const result = []
    for (let i = heap.length - 1; i >= 0; i--) {
      result.push(heap[0])
      heap[0] = heap[i]
      heap.length = i
      for (let j = ((i - 1) / 2) | 0; j >= 0; j--) heapify(j)
    }
    return result
  }

  console.info('Initial heap', heap)
  buildMinHeap()
  return sort()
}

