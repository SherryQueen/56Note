/**
 * @filename    2.reverse.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reverse-integer/
 */

/**
 * 1. 字符串直接反转, 并对队尾的0做处理.  如果位负数, 则取其第一位做符号位
 * 2. 按10位取余, 每个余数作为最新的高位累加
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const max = 2 ** 31
  let res = 0
  let ans = x
  while (ans) {
    res = res * 10 + (ans % 10)
    if (res > max - 1 || res < -max) return 0
    ans = ans > 0 ? Math.floor(ans / 10) : Math.ceil(ans / 10)
  }
  return res
}
