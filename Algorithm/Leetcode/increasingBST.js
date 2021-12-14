/**
 * @filename    increasingBST.js
 * @author      56
 * @description https://leetcode-cn.com/problems/increasing-order-search-tree/
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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  const res = new TreeNode()
  let prevNode = res

  const dfs = (node) => {
    if (node.left) dfs(node.left)

    prevNode.right = new TreeNode(node.val)
    prevNode = prevNode.right

    if (node.right) dfs(node.right)
  }
  dfs(root)
  return res.right
}
