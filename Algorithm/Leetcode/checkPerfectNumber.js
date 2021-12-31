/**
 * @filename    checkPerfectNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/perfect-number/
 */

/*
  首先我们来明确下 因子的定义: **如果整数A除以B, 且没有余数, 则B是A的因子**
  比如: `8=1*8` `8=2*4` 即8的因子为 1, 2, 4, 8

  回到题目本身, 因为因子n和 num/n 是成对出现的. 且 n*n<=num 所以我们可以将n从 1-->n (n*n<=num)
  */

/**
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function (num) {
  if (num === 1) return false
  let sum = 1
  let d = 2
  for (; d * d < num; d++) {
    if (num % d === 0) sum += d + num / d
  }
  if (d * d === num) sum += d
  return sum === num
}

checkPerfectNumber(28)
