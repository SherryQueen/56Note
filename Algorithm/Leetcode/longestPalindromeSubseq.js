/**
 * @filename    longestPalindromeSubseq.js
 * @author      56
 * @description https://leetcode-cn.com/problems/longest-palindromic-subsequence/
 */

/*
针对一个回文子序列, 如果去掉了其首尾,依然能够成一个回文子序列
我们用 dp[i][j]表示在[i,j]之间的最长子序列.
当 i<j时,
如果 s[i] == s[j] 那么新的最长子序列 dp[i][j] = dp[i+1][j-1] + 2 (新增的两个字符)
如果 s[i] != s[j] 则 dp[i][j] = max(dp[i][j-1], dp[i+1][j])
根据转移方程, 我们可以推算出最终的结果.
⚠️注意. 因为最终的大回文子序列是由小序列转移而来, 所以我们要确保 i从 len->0 j从i+1->len
*/

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const len = s.length
  if (len < 2) return len
  const dp = [...Array(len)].map((_) => Array(len).fill(0))
  for (let i = len - 1; i >= 0; i--) {
    dp[i][i] = 1
    for (let j = i + 1; j < len; j++)
      dp[i][j] = s[i] === s[j] ? dp[i + 1][j - 1] + 2 : Math.max(dp[i + 1][j], dp[i][j - 1])
  }
  return dp[0][len - 1]
}
