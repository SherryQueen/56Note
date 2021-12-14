/**
 * @filename    shortestPathLength.js
 * @author      56
 * @description https://leetcode-cn.com/problems/shortest-path-visiting-all-nodes/
 */

/**
 * 一开始想到了BFS, 但对如何结束遍历有点困惑. 参照了官方题解理了下思路
 * 1. 根据题目, 是要寻找最短的遍历路程. 我们需要通过不停地尝试各种路径来实现对所有节点遍历. 但我们只需要求最短的路径, 故此处采用BFS合适(因为BFS是逐层遍历, 当我们遍历到第一个访问了所有节点的路径方式时,我们就得到了最小的路径, 剩下的路径长度 必然大于等于当前路径的长度)
 * 2. 只有当所有节点在该条路径中都被访问过, 才会终止. 我们首先会想到通过map来标记状态, 但因为遍历的路径会越来越多.所以这个方式不合适. 为了减小内存的使用, 用 二进制位 标记当个节点的访问状态就合适(即状态压缩). 可以省下大量的内存空间, 也方便比较. 比如当 visible的值 = 2^n-1(即 1<<len -1) 即访问了所有的节点
 * 3. 故. 我们针对BFS 队列. 我们通过 [n, visible, dist] 来表示 当前节点的编号, 当前路径的节点访问情况, 当前路径的距离.
 * 4. 为了避免重复搜索, 即进入了一条已遍历的路径. 比如 已有路径 a->b->c  当我们经过BFS搜索, 准备再一次访问 a->b->c 的路径 其实是没必要的. 因为当前路过 a->b->c的最短路径已经存在于 queue中了 所以我们也通过状态压缩全局标记记录搜索路径. 避免重复搜索
 * @param {number[][]} graph
 * @return {number}
 */
const shortestPathLength = function (graph) {
  const len = graph.length
  const marked = [...Array(len)].map(() => [...Array(1 << len)].fill(false)) // 全局标记. 到达该节点时, 当前搜索路径已遍历的节点个数
  const queue = []
  for (let i = 0; i < len; i++) {
    queue.push([i, 1 << i, 0])
    marked[i][1 << i] = true
  }

  while (queue.length) {
    const [n, visible, dist] = queue.shift()

    // 已遍历到最短路径
    if (visible === (1 << len) - 1) return dist

    // 继续当前的搜索路径
    for (const g of graph[n]) {
      const v = visible | (1 << g) // 更新节点访问标记
      // 剪枝: 避免重复的搜索路径. 导致节点被反复遍历
      if (!marked[g][v]) {
        marked[g][v] = true
        queue.push([g, v, dist + 1])
      }
    }
  }
}

console.info(shortestPathLength([[1], [0, 2, 4], [1, 3], [2], [1, 5], [4]]))
// console.info(shortestPathLength([[1, 2, 3], [0], [0], [0]]))
