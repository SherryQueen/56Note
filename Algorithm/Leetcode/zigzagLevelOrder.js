/**
 * @filename    zigzagLevelOrder.js
 * @author      56
 * @description https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root) return []
  const _result = []
  let _queue = [root]
  let flag = true
  while (_queue.length) {
    const queue = []
    const result = []
    for (let node of _queue) {
      if (node) {
        if (flag) result.push(node.val)
        else result.unshift(node.val)
        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
      }
    }
    _result.push(result)
    flag = !flag
    _queue = queue
  }
  return _result
}

const { generateBinaryTree } = require('./common')
test('zigzagLevelOrder', () => {
  expect(zigzagLevelOrder(generateBinaryTree([3, 9, 20, null, null, 15, 7]))).toEqual([[3], [20, 9], [15, 7]])
})
