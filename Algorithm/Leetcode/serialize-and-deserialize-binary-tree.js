/**
 * @filename    serialize-and-deserialize-binary-tree.js
 * @author      56
 * @description https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = (root) => {
  if (root === null) return '[]'
  const queue = [root]
  const result = []
  while (queue.length) {
    const node = queue.pop()
    if (node) {
      result.push(node.val)
      queue.unshift(node.left)
      queue.unshift(node.right)
    } else {
      result.push('null')
    }
  }
  return `[${result.join(',')}]`
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const str = data.slice(1, -1)
  if (!str) return null

  const parse = (str) => (str === 'null' ? null : parseInt(str, 10))
  const array = str.split(',')
  const root = new TreeNode(parse(array))
  const queue = [root]
  let i = 1
  while (queue.length) {
    const node = queue.pop()
    const lv = parse(array[i++])
    const rv = parse(array[i++])
    // 先处理左节点
    if (lv !== null) {
      node.left = new TreeNode(lv)
      queue.unshift(node.left)
    }
    if (rv !== null) {
      node.right = new TreeNode(rv)
      queue.unshift(node.right)
    }
  }
  return root
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
