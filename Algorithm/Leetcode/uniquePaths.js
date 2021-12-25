/**
 * @filename    uniquePaths.js
 * @author      56
 * @description https://leetcode-cn.com/problems/unique-paths/
 */

const uniquePaths = function (m, n) {
  if (m === 1 || n === 1) return 1
  const dp = [...Array(m)].map((_, idx) => {
    if (idx === 0) return [...Array(n)].fill(1)
    return [...Array(n)].fill(0)
  })
  for (let i = 0; i < m; i++) dp[i][0] = 1

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
}

// console.info(uniquePaths(1, 3));
// console.info(uniquePaths(3, 1));
console.info(uniquePaths(3, 2))
console.info(uniquePaths(5, 4))
