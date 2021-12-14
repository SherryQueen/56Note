/**
 * @filename    distanceK.js
 * @author      56
 * @description https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * 节点值唯一. 故我们可以以节点值标记每一个节点
 * 我们首先需要找到目标 target. 以目标target开始往上或往下寻找距离点
 * 我们可以通过记录 节点之间的父子关系, 实现向上寻找
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  const map = new Map()
  const dfs = (node) => {
    if (node.left !== null) {
      map.set(node.left.val, node)
      dfs(node.left)
    }
    if (node.right !== null) {
      map.set(node.right.val, node)
      dfs(node.right)
    }
  }
  dfs(root)

  const result = []
  /**
   * @param {*} node 当前查询的节点
   * @param {*} from 是从哪个节点查询过来的, 避免重复查询与陷入死循环
   * @param {*} depth 遍历的深度 记录与target的距离
   */
  const find = (node, from, depth) => {
    if (!node) return
    if (depth === k) {
      result.push(node.val)
      return
      // 提前返回结果, 减少无必要的遍历
    }
    if (node.left !== from) find(node.left, node, depth + 1)
    if (node.right !== from) find(node.right, node, depth + 1)

    const parent = map.get(node.val)
    if (parent !== from) find(parent, node, depth + 1)
  }
  find(target, null, 0)
  return result
}
