/**
 * @filename    minDiffInBST.js
 * @author      56
 * @description https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/
 */
/**
 * Definition for a binary tree node.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  let min = Number.MAX_SAFE_INTEGER
  let pre = -1
  const dfs = (node) => {
    if (node === null) return
    dfs(node.left)

    if (pre === -1) pre = node.val
    else {
      min = Math.min(min, node.val - pre)
      pre = node.val
    }
    dfs(node.right)
  }

  dfs(root)
  return min
}
