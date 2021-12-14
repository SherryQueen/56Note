/**
 * @filename    findSecondMinimumValue.js
 * @author      56
 * @description https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/
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
 * 题目中: 节点的值为两个子节点中较小的值. 也就意味着 根结点的值是最小值. 故只要保证遍历得到的比根结点值大的最小值就是题目所要求的结果
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
  let result = -1
  const rootValue = root.val

  const dfs = (node) => {
    if (node === null) return
    /* 当前分支已经不会出现更小的值了 */ if (result !== -1 && node.val >= result) return
    if (node.val > rootValue) result = node.val
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return result
}
