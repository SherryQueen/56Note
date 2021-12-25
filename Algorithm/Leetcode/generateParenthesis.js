/**
 * https://leetcode-cn.com/problems/generate-parentheses/
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 */

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  if (n === 0) return []
  if (n === 1) return ['()']

  const res = []

  const dfs = (str, l, r) => {
    if (l < 0 || r < 0) return
    if (l === 0 && r === 0) return res.push(str)
    if (l < r) return // * 右括号数应小于等于左括号 剪枝
    if (l > 0) dfs(str + '(', l - 1, r)
    if (r > 0) dfs(str + ')', l, r - 1)
  }

  dfs('', n - 1, n - 1)
  return res
}
