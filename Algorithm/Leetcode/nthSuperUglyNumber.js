/**
 * @filename    nthSuperUglyNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/super-ugly-number/
 */

/**
 * 丑数一定是由质因数 primes和 当前的丑数的乘积得到的
 * 以 primes = [2, 3, 5] 为例子
 * 丑数为: dp[1]=1;dp[2]=2;dp[3]=dp[1]*3;dp[4]=dp[2]*2;dp[5]=dp[1]*5;dp[6]=dp[2]*3=dp[3]*2;...
 * 根据上述的一个拆解示例. 我们可以使用 三个 指针 分别 表示 2, 3, 5 三个质因数 与 哪个旧丑数相乘 可以得到最小的新丑数.(⚠️注意: 可能会出现乘积相等的可能, 如 dp[6]的求值. 要避免重复计算)
 * 针对本题, 我们可以把指针的个数扩展为  primes.length 个. 依照上述的逻辑进行计算从而得到目标结果
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function (n, primes) {
  if (n === 1) return 1
  const len = primes.length
  const dp = new Array(n + 1).fill(0)
  const points = new Array(len).fill(1)
  dp[1] = 1

  for (let i = 2; i <= n; i++) {
    let min = Number.MAX_VALUE
    for (let j = 0; j < len; j++) {
      min = Math.min(min, dp[points[j]] * primes[j])
    }
    dp[i] = min
    for (let j = 0; j < len; j++) {
      // 所有可能得到当前结果的dp下标 都需要+1
      if (min === dp[points[j]] * primes[j]) {
        points[j]++
      }
    }
  }
  return dp[n]
}
