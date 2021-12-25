// 堆: 是一种近似完全二叉树的结构. 每个子节点的键值或索引皆小于(大于)它的父节点. 可实现优先队列. 确保堆顶是优先级最高的点()

class Heap {
  constructor() {
    // heap[0] 表示是最大堆还是最小堆. 0: 最小堆 1: 最大堆
    this.heap = [0] // 堆顶点以为1, 这样可满足. 每个节点i的左右子节点分别为 2*i 和 2*i+1
  }

  /**
   * 交换数组中的两项值得
   * @param {Array<number>} heap 堆数组
   * @param {number} a 需要交换的下标
   * @param {number} b 需要交换的下标
   */
  _swap = (heap, a, b) => {
    ;[heap[a], heap[b]] = [heap[b], heap[a]]
  }

  /**
   * 是否为最大堆
   * @returns boolean
   */
  isMax = () => {
    return !!this.heap[0]
  }

  /**
   * 插入一个节点
   * 1. 作为子节点插入队尾
   * 2. 如果该节点大于(小于)父节点的值. 则与父节点交换 如小于(大于)父节点的值,则插值完成
   * 3. 重复2 直到插值完成 或 当前值变为根节点
   * @param {number} value 插入的节点
   */
  insert = (value) => {
    const heap = this.heap
    heap.push(value)

    let i = heap.length - 1
    const isMax = this.isMax()
    while (i > 1) {
      const p = (i / 2) | 0 // 对应的父节点
      if (
        /* 大顶堆, 且子节点值大于父节点 */ (isMax && heap[p] < heap[i]) ||
        /* 小顶堆, 且子节点值小于父节点 */ (!isMax && heap[p] > heap[i])
      ) {
        this._swap(heap, p, i)
        i = p
      } else break
    }
    return this
  }

  /**
   * 删除一个节点(堆顶点出堆)
   * 1. 取堆顶点
   * 2. 将存储的最后一位数字赋值给堆顶点
   * 3. 声明变量p(初始为当前堆顶点下标)
   * 4. 比较p与p的两个子节点的值. 若 heap[p] 大于(小于) 子节点的值, 则交换父节点与子节点(要注意两个子节点中间的大小关系)
   * 5. 重复4 直到没有子节点 或 heap[p] 大于(小于)两个子节点的值. 退出
   */
  pop = () => {
    if (this.size() === 0) return undefined
    const heap = this.heap
    const value = heap[1] // 最后需要返回的值
    const len = heap.length - 1 // 移除一位. 得到新的堆的存储长度
    heap[1] = heap[len] // 将最后一位值放到堆顶. 后续进行调整

    let p = 1
    const isMax = this.isMax()
    while (true) {
      const [l, r] = [p * 2, p * 2 + 1]
      // 没有子节点
      if (r >= len) break
      // 只有左子节点
      if (l === len) {
        if ((isMax && heap[p] < heap[l]) || (!isMax && heap[p] > heap[l])) this._swap(heap, p, l)
        break
      }
      // 存在两个子节点
      if (
        /* 最大堆: 父节点大于两个子节点 */ (isMax && heap[p] >= heap[l] && heap[p] >= heap[r]) ||
        /* 最小堆: 父节点小于两个子节点 */ (!isMax && heap[p] <= heap[l] && heap[p] <= heap[r])
      )
        break
      if (
        /* 最大堆: 父节点小于左右子节点 */ (isMax && heap[p] <= heap[l] && heap[p] <= heap[r]) ||
        /* 最小堆: 父节点大于左右子节点 */ (!isMax && heap[p] >= heap[l] && heap[p] >= heap[r])
      ) {
        if (
          /* 最大堆: 避免出现交换后的父节点大于子节点的情况. 我们交换两个子节点中值较大的节点 */ (isMax &&
            heap[l] >= heap[r]) ||
          /* 最小堆: 避免出现交换后的父节点小于子节点的情况. 我们交换两个子节点中值较小的节点 */ (!isMax &&
            heap[l] <= heap[r])
        ) {
          this._swap(heap, p, l)
          p = l
        } else {
          this._swap(heap, p, r)
          p = r
        }
        continue
      }

      if (
        /* 最大堆: 父节点小于右节点, 大于左节点 */ (isMax && heap[p] >= heap[l]) ||
        /* 最小堆: 父节点大于右节点, 小于左节点 */ (!isMax && heap[p] <= heap[l])
      ) {
        this._swap(heap, p, r)
        p = r

        continue
      }

      if (
        /* 最大堆: 父节点小于左节点 大于右节点 */ (isMax && heap[p] >= heap[r]) ||
        /* 最小堆: 父节点大于左节点 小于右节点 */ (!isMax && heap[p] <= heap[r])
      ) {
        this._swap(heap, p, l)
        p = l

        continue
      }
    }

    heap.length = this.heap.length - 1 // 存储长度-1
    return value
  }

  size = () => this.heap.length - 1

  /**
   * 堆排序
   * 根据堆的性质, 我们可知,其顶点值, 一定是当前最大(最小)的值.
   * 1. 设定变量 ans (当前堆[1 -> ans]的尾部值)
   * 2. 交换顶点 和 ans 保证尾部的值是最值
   * 3. 重新构建 [1 -> ans-1]的堆
   * 4. 重复 2-3. 直到 ans === 1 停止
   */
  sort = () => {
    const result = []
    while (this.size()) {
      const value = this.pop()
      console.info('value:', value, '\tsize:', this.size())
      result.push(value)
    }
    result.unshift(this.heap[0]) // 补上首位
    console.info('result', result)
    this.heap = result
    return result
  }

  /**
   * 构建堆
   * @param {Array<number} arr 需要构建的初始值
   */
  buildHeap = (arr) => {
    arr.forEach(this.insert)
    return this
  }

  buildMaxHeap = (arr) => {
    this.heap[0] = 1
    return this.buildHeap(arr)
  }

  buildMinHeap = (arr) => {
    this.heap[0] = 0
    return this.buildHeap(arr)
  }

  /**
   * 打印结果
   */
  print = () => {
    const graph = []
    const heap = this.heap
    const len = heap.length

    let sliceStart = 1 // 裁剪的起始下标
    let sliceLength = 1 // 每层的长度
    while (sliceStart < len) {
      graph.push(heap.slice(sliceStart, sliceStart + sliceLength))
      sliceStart += sliceLength
      sliceLength *= 2
    }

    const charWidth = 2

    const depth = graph.length
    const spaces = [0]
    for (let i = 0; i < depth; i++) spaces.unshift(spaces[0] * 2 + charWidth)
    for (let i = 0; i < depth; i++)
      console.info(
        [
          ''.padStart(spaces[i + 1], ' '),
          ...graph[i].map(
            (char, idx) =>
              char.toString().padStart(charWidth, ' ') +
              ''.padStart(idx === graph[i].length - 1 ? spaces[i + 1] : spaces[i], ' ')
          ),
        ].join('')
      )
  }
}

console.info('Max Heap')
const heap1 = new Heap().buildMaxHeap([5, 3, 6, 4, 1, 7, 2, 9, 8, 15, 11, 10, 13, 12, 14])
heap1.sort()
heap1.print()

console.info('Min Heap')
const heap2 = new Heap().buildMinHeap([5, 3, 6, 4, 1, 7, 2, 9, 8, 15, 11, 10, 13, 12, 14])
heap2.sort()
heap2.print()
