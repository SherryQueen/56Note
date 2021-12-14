/**
 * @filename    leafSimilar.js
 * @author      56
 * @description https://leetcode-cn.com/problems/leaf-similar-trees/
 */

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const dfs = (node, result = []) => {
    if (!node) return result
    if (!node.left && !node.right) {
      result.push(node.val)
      return result
    }
    if (node.left) dfs(node.left, result)
    if (node.right) dfs(node.right, result)
    return result
  }

  const r1 = dfs(root1)
  const r2 = dfs(root2)
  return r1.join(',') === r2.join(',')
}
