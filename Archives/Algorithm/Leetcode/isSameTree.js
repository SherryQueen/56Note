/**
 * @filename    isSameTree.js
 * @author      56
 * @description https://leetcode-cn.com/problems/same-tree/
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true
  if (!p || !q) return false

  const pQueue = [p]
  const qQueue = [q]
  while (pQueue.length && qQueue.length) {
    const n1 = pQueue.shift()
    const n2 = qQueue.shift()
    if (n1.val !== n2.val) return false

    if (n1.left === null && n2.left === null) {
    } else if (!n1.left || !n2.left) return false
    else {
      pQueue.push(n1.left)
      qQueue.push(n2.left)
    }

    if (n1.right === null && n2.right === null) {
    } else if (!n1.right || !n2.right) return false
    else {
      pQueue.push(n1.right)
      qQueue.push(n2.right)
    }
  }
  return pQueue.length === 0 && qQueue.length === 0
}

const { generateBinaryTree } = require('./common')
test('isSameTree', () => {
  expect(isSameTree(generateBinaryTree([]), generateBinaryTree([]))).toBeTruthy()
  expect(isSameTree(generateBinaryTree([1, 2, 3]), generateBinaryTree([1, 2, 3]))).toBeTruthy()
  expect(isSameTree(generateBinaryTree([1]), generateBinaryTree([1, null, 2]))).toBeFalsy()
  expect(isSameTree(generateBinaryTree([1, 2, 3]), generateBinaryTree([1, 2]))).toBeFalsy()
  expect(isSameTree(generateBinaryTree([1, 2, 3]), generateBinaryTree([1, 2, 4]))).toBeFalsy()
  expect(isSameTree(generateBinaryTree([1, 2, 3]), generateBinaryTree([1, 2, 3, 4]))).toBeFalsy()
})
