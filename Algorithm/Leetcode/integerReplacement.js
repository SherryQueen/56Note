/**
 * @filename    integerReplacement.js
 * @author      56
 * @description https://leetcode-cn.com/problems/integer-replacement/
 */

/*
DFS深度遍历
遇到偶数, 最快的方式是除以2
遇到奇数, 则比较 +1 和 -1 的次数区别.
因为对于特定数n, 转变成1的最小次数固定, 所以可以使用map来做记录. 通过记忆加速查询
*/

const memo = new Map()
/**
 * @param {number} n
 * @return {number}
 */
var integerReplacement = function (n) {
  if (n === 1) return 0
  if (memo.has(n)) return memo.get(n)
  const count = 1 + (n % 2 ? Math.min(integerReplacement(n + 1), integerReplacement(n - 1)) : integerReplacement(n / 2))
  memo.set(n, count)
  return count
}

console.assert(integerReplacement(8) === 3)
console.assert(integerReplacement(7) === 4)
console.assert(integerReplacement(4) === 2)
console.assert(integerReplacement(1) === 0)
