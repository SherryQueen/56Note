# 排序算法

> tags: #Sort #Bubble #Selection #Insertion #Quick #Heap #Shell #Merge

![Sorts](/Assets/20211207063801.png)

## 冒泡 Bubble

![Bubble](/Assets/20211207063802.gif)

```ts
// 冒泡排序:
// 1. 比对相邻两个数 i, i+1 若 [i] > [i+1] 则交换二者位置
// 2. 一次比较完成，大的数字如同水里的泡泡一样冒到了最高位
// Tips: 如果比较过程未发生交换， 即当前已经完成排序。
function bubble(nums) {
  let ans = nums.length
  while (ans--) {
    let hasSwap = false
    for (let i = 0; i < ans; i++) {
      if (nums[i] > nums[i + 1]) {
        hasSwap = true
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
      }
    }
    if (!hasSwap) break
  }
  return nums
}
```

## 选择 Selection

![Selection](/Assets/20211207063803.gif)

```ts
// 选择排序：
// 1. 从 i -> len 遍历。找到当前最小值 j
// 2. 交换 i，j位置，让最小值排在首位
// 3. 多次交换完成，即可完成排序
function selection(nums) {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    let ans = i
    for (let j = i + 1; j < len; j++) {
      if (nums[ans] > nums[j]) ans = j
    }
    if (ans !== i) [nums[i], nums[ans]] = [nums[ans], nums[i]]
  }
  return nums
}
```

## 插入 Insertion

![Insertion](/Assets/20211207063804.gif)

```ts
// 插入排序
// 1. 顺序遍历每一项
// 2. 反向遍历 i -> 0。直到找到 [i] < [j]. 然后将i 插入到j前
// Tips: 因为反向遍历找到目标下标后需要移动 j->i的之间的位置。 固我们可以在反向遍历时.直接对 [j] = [j-1]赋值
function insertion(nums) {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    let ans = nums[i]
    let j = i
    while (j) {
      if (nums[j - 1] < ans) break
      nums[j] = nums[j - 1]
      j--
    }
    nums[j] = ans
  }
  return nums
}
```

## 快排 Quick

![Quick](/Assets/20211207063805.gif)

```ts
// 快速排序
// 1. 我们寻找一个基准值piv. (一般是当前数组左下标值l). 再设定一个中间值 ans(用于替换遍历之后, nums[piv]应该所在的位置)
// 2. 我们遍历 piv+1 -> r    nums[i] < nums[piv] 则与ans替换(ans替换完成后+1)  nums[i] > nums[piv] 则不做操作
// 3. 当遍历完成. 我们将 piv 和 中间值下标ans-1进行替换. 则实现 ans左边的值<nums[ans] ans右边的值>nums[ans]
function quickSort(nums) {
  const len = nums.length
  const swap = (a, b) => ([nums[a], nums[b]] = [nums[b], nums[a]])
  const sort = (l, r) => {
    if (l >= r) return
    const piv = l
    let ans = l + 1
    for (let i = ans; i <= r; i++) {
      if (nums[piv] > nums[i]) swap(i, ans++)
    }
    swap(piv, ans - 1)
    sort(piv, ans - 2)
    sort(ans, r)
  }

  sort(0, len - 1)
  return nums
}
```

## 堆排 Heap

![Heap](/Assets/20211207063806.gif)

```ts
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
```

## 希尔 Shell

![Shell](/Assets/20211207063807.gif)

```ts
// 希尔排序
// 希尔排序是对插入排序的优化
// 1. 我们将数组按下标的一定增量分成多组. 每组按照插入排序进行排列
// 2. 每次将增量-1. 重复1. 当增量减为1, 数组只被分为一组

function shell(nums) {
  const len = nums.length
  let shell = (len / 2) | 0
  while (shell) {
    for (let i = 0; i < shell; i++) {
      for (let j = i + shell; j < len; j += shell) {
        const ans = nums[j]
        let k = j
        while (k >= shell) {
          if (nums[k - shell] < ans) break
          nums[k] = nums[k - shell]
          k -= shell
        }
        nums[k] = ans
      }
    }
    shell--
  }
  return nums
}
```

## 归并 Merge

![Merge](/Assets/20211207063808.gif)

```ts
// 归并排序
// 将排序的任务按段拆分成多个小任务进行
// 1. 将数组分成两部分,
// 2. 若数组长度为2, 则比较当前数组的两个数并返回排序后的数组. 若数组长度为1, 则直接返回数组. 若数组长度大于2.则重复1

function merge(nums) {
  if (nums.length <= 1) return nums
  const mid = (nums.length / 2) | 0
  const left = merge(nums.slice(0, mid))
  const right = merge(nums.slice(mid))

  const result = []
  let i = 0
  let j = 0
  let lLen = left.length
  let rLen = right.length
  while (i < lLen && j < rLen) left[i] < right[j] ? result.push(left[i++]) : result.push(right[j++])
  if (i < lLen) result.push(...left.slice(i))
  if (j < rLen) result.push(...right.slice(j))
  return result
}
```
