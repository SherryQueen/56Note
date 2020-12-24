/**
 * @filename    rightSideView.js
 * @author      56
 * @description https://leetcode-cn.com/problems/binary-tree-right-side-view/
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return []
  let queue = [root]
  const views = []
  while (queue.length) {
    // * Add value
    views.push(queue[queue.length - 1].val)

    const temp = []
    for (let i = 0, len = queue.length; i < len; i++) {
      const node = queue[i]
      if (node.left) temp.push(node.left)
      if (node.right) temp.push(node.right)
    }
    queue = temp
  }
  return views
}

const { generateBinaryTree } = require('./common')

test('rightSideView', () => {
  expect(rightSideView(generateBinaryTree([1, 2, 3, null, 5, null, 4]))).toEqual([1, 3, 4])
})
