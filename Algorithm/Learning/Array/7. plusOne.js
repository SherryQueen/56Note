/**
 * @filename    7. plusOne.js
 * @author      56
 * @description https://leetcode-cn.com/problems/plus-one/
 */

/**
 * 1. 加一位数字. 加法逢十进一. 故加完结果后判断是否大于等于10
 * 2. 若所有数字加完后 还有一个进位, 则需要向数组头部添加新的1位
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  const len = digits.length
  let carry = 1
  let i = len
  while (i) {
    i--
    digits[i] += carry
    if (digits[i] >= 10) {
      digits[i] -= 10
      carry = 1
    } else {
      carry = 0
      break
    }
  }
  if (i === 0 && carry) digits.unshift(1)
  return digits
}
