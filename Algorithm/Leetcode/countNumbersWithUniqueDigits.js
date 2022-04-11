/**
 * @filename    countNumbersWithUniqueDigits.js
 * @author      56
 * @description https://leetcode-cn.com/problems/count-numbers-with-unique-digits/
 */

/**
 * n=0 => 1种
 * n=1 => count(0) + 10个数字在一个位置上排列组合
 * n>=2 => count(0) + count(1) + ... count(n) + 9(9个数字在第一位组合(不能以0开头)) * 9(9个数字在第二位组合(去除掉第一位的数))*8(去除掉在一,二位的数)+...
 */

/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function (n) {
  if (n === 0) return 1
  if (n === 1) return 10

  let res = 10
  let num = 9
  for (let i = 0, remain = n - 1; i < remain; i++) {
    num *= 9 - i
    res += num
  }
  return res
}
