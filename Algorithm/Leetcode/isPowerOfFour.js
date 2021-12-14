/**
 * @filename    isPowerOfFour.js
 * @author      56
 * @description https://leetcode-cn.com/problems/power-of-four/
 */

/**
 * 1. 排除负数
 * 2. 如果是2的幂 则 二进制只有首位为1  如果是4的幂 则 二进制只有1 且1位于偶数位上
 * 3. 通过构建
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  return (
    /* 非负数 */
    n > 0 &&
    /* 判断是否为2的幂 */
    (n & (n - 1)) === 0 &&
    /* 通过构建偶数位为0 奇数为1的二进制.  即 (1010101010101010)2 => 0xaaaa */
    (n & 0xaaaaaaaa) === 0
  )
}
