/**
 * @filename    networkDelayTime.js
 * @author      56
 * @description https://leetcode-cn.com/problems/network-delay-time/
 */

/**
 * -. 题目可理解为 求 从n节点开始, 到所有节点的最短路径的最大值
 * 1. 我们可以通过BFS搜索, 记录每一个节点的到达时间.
 * 2. 我们通过构建map 用于快速访问从当前节点到目标节点的时间
 * 3. 我们从 节点 n 出发, 遍历节点. 若该节点未遍历. 则入队遍历. 若到达该节点的时间更多, 亦入队遍历
 * 4. 当所有节点都遍历完成, 我们到达节点时间的最大值即可. 若出现了未访问的节点 则 返回-1
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  const map = {}
  times.forEach((time) => {
    const arr = map[time[0]] || []
    arr.push([time[1], time[2]])
    map[time[0]] = arr
  })

  const array = [...Array(n + 1)].fill(-1) // 因为有到达时间为0 的边. 所以使用-1
  array[k] = 0
  const queue = [[k, 0]]

  while (queue.length) {
    const [node, time] = queue.pop()
    ;(map[node] || []).forEach(([n, t]) => {
      if (array[n] !== -1 && array[n] <= time + t) return

      array[n] = time + t
      queue.push([n, array[n]])
    })
  }

  let max = 0
  for (let i = 1; i <= n; i++) {
    if (array[i] === -1) return -1
    if (array[i] > max) max = array[i]
  }
  return max
}

console.info(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    4,
    2,
  ),
)
