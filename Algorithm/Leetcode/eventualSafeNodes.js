/**
 * @filename    eventualSafeNodes.js
 * @author      56
 * @description https://leetcode-cn.com/problems/find-eventual-safe-states/
 */

/**
 * 根据题意. 若节点位于一个环内, 或可到达环中任一节点, 则该起始节点不安全. 反之, 该节点为安全的
 * 为了减少遍历, 我们可以将节点标记状态为.  0:未访问, 1:已访问, 2:安全节点(节点最终可到达安全节点)
 * 当节点到达 未访问节点, 标记为 已访问.
 * 当节点到达 已访问节点, 则意味着进入环.
 * 当节点到达 安全节点, 则意味着当前路径不形成环. 则将过往已遍历的节点都标记为 安全节点
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  const len = graph.length
  const mark = [...Array(len)].fill(0)
  const result = []

  const isSafe = (n) => {
    if (mark[n]) return mark[n] === 2 // 已访问过. 则返回是否安全的判断

    mark[n] = 1 // 标记为已访问
    for (const next of graph[n]) {
      if (!isSafe(next)) return false // 若不是安全节点. 则当前节点也非安全节点
    }

    // 标记为安全节点
    mark[n] = 2
    return true
  }

  for (let i = 0; i < len; i++) {
    if (isSafe(i)) result.push(i)
  }
  return result
}
