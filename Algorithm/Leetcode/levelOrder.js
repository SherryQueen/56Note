/**
 * @filename    levelOrder.js
 * @author      56
 * @description https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/
 */

// Definition for a Node.
function Node(val, children) {
  this.val = val
  this.children = children
}

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []

  const tree = []
  let queue = [root]
  while (queue.length) {
    const result = []
    for (let i = 0, len = queue.length; i < len; i++) {
      const node = queue.shift()
      result.push(node.val)
      for (const c of node.children) queue.push(c)
    }
    tree.push(result)
  }
  return tree
}
