/**
 * @filename    isEvenOddTree.js
 * @author      56
 * @description https://leetcode-cn.com/problems/even-odd-tree/
 */

/*
根据奇偶树的性质.
我们针对第i(奇数)层逐个元素遍历, 判断其从左至右是否严格递减 且每项为偶数
我们针对第j(偶数)层逐个元素遍历, 判断其从左至右是否严格递增 且每项为奇数
若满足上述,则符合题意. 因为逐层遍历, 故我们采取BFS最为合适.判断每层是否符合条件即可
*/

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
  const isOddNum = (num) => !!(num % 2)

  let queue = [root]
  let depth = 0
  while (queue.length) {
    const isOdd = isOddNum(depth)
    const nextQueue = []

    let prev = queue.shift()
    if (prev.left) nextQueue.push(prev.left)
    if (prev.right) nextQueue.push(prev.right)
    if ((isOdd && isOddNum(prev.val)) || (!isOdd && !isOddNum(prev.val))) return false

    for (const node of queue) {
      if (isOdd) {
        if (isOddNum(node.val)) return false
        if (node.val >= prev.val) return false
      } else {
        if (!isOddNum(node.val)) return false
        if (node.val <= prev.val) return false
      }
      if (node.left) nextQueue.push(node.left)
      if (node.right) nextQueue.push(node.right)
      prev = node
    }
    depth++
    queue = nextQueue
  }
  return true
}
