/**
 * @filename    isCousins.js
 * @author      56
 * @description https://leetcode-cn.com/problems/cousins-in-binary-tree/
 */

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  let queue = [root]
  while (queue.length) {
    const arr = queue
    queue = []
    let hasX = false
    let hasY = false
    arr.forEach((item) => {
      let needJudgeBrother = !hasX && !hasY
      if (item.left) {
        if (item.left.val === x) hasX = true
        if (item.left.val === y) hasY = true
        queue.push(item.left)
      }
      if (item.right) {
        if (item.right.val === x) hasX = true
        if (item.right.val === y) hasY = true
        queue.push(item.right)
      }
      if (needJudgeBrother && hasX && hasY) hasY = false
    })
    if (hasX && hasY) return true
    if (hasX || hasY) return false
  }
  return false
}

console.info(
  isCousins(new TreeNode(1, new TreeNode(2, null, new TreeNode(4)), new TreeNode(3, null, new TreeNode(5))), 4, 5)
)
