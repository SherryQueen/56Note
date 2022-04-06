/**
 * @filename    findMinHeightTrees.js
 * @author      56
 * @description https://leetcode-cn.com/problems/minimum-height-trees/
 */

/**
 * 求最小高度, 在图中, 我们找到所有可能为叶子节点的节点(即度为 1)
 * 通过 BFS 逐层向内收缩并进行降度,直到所有节点的度为 1 则为目标节点
 * 1. 找到所有度为 1 的节点
 * 2. 根据节点向内收缩, 找到对应的节点 A, 并将其度值 -1, 得到新的度为 1 的节点集合
 * 3. 重复 1, 2. 得到一个度都为 1 的结果结合
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n === 1) return [0]
  if (n === 2) return [0, 1]

  // 计算每个节点的度
  const degree = new Array(n).fill(0)
  const adj = new Array(n).fill(0).map(() => new Array())
  for (const [e1, e2] of edges) {
    adj[e1].push(e2)
    adj[e2].push(e1)
    degree[e1]++
    degree[e2]++
  }

  const queue = []
  for (let i = 0, len = degree.length; i < len; i++) {
    if (degree[i] <= 1) {
      degree[i]--
      queue.push(i)
    }
  }

  let result = []
  while (queue.length) {
    result = Array.from(queue)
    // 一次遍历一组
    for (let i = 0, len = queue.length; i < len; i++) {
      const node = queue.shift()
      adj[node].forEach((n) => {
        degree[n]--
        if (degree[n] === 1) queue.push(n) // 避免重复添加, 且将本轮所有度 =1 节点加入下轮 BFS
      })
    }
  }
  return result
}
