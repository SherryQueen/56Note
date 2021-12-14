/**
 * @filename    countArrangement.js
 * @author      56
 * @description https://leetcode-cn.com/problems/beautiful-arrangement/
 */

/*
找出所有可能的排列。
我们可以通过回溯的方法来计算第i位上的数字是否符合题目要求
为了加快遍历， 我们可以提前计算 第i位上符合要求的数字是哪些，从而加快遍历
*/

/**
 * @param {number} n
 * @return {number}
 */
var countArrangement = function (n) {
  const match = [...Array(n + 1)].map(() => [])
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i % j === 0 || j % i === 0) match[i].push(j)
    }
  }

  let ans = 0
  const visible = [...Array(n + 1)].fill(false)
  const dfs = (i) => {
    if (i === n + 1) {
      ans++
      return
    }

    for (const num of match[i]) {
      if (!visible[num]) {
        visible[num] = true
        dfs(i + 1)
        visible[num] = false
      }
    }
  }
  dfs(1)
  return ans
}
