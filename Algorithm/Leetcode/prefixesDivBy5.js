/**
 * @filename    prefixesDivBy5.js
 * @author      56
 * @description https://leetcode-cn.com/problems/binary-prefix-divisible-by-5/
 */

/**
 * @param {number[]} A
 * @return {boolean[]}
 */
var prefixesDivBy5 = function (A) {
  const res = []
  let num = 0
  for (let i = 0, len = A.length; i < len; i++) {
    // ? 溢出了
    // num = num * 2 + A[i]
    // res.push(num % 5 === 0)
    num = ((num << 1) + A[i]) % 5
    res.push(num === 0)
  }
  return res
}

jest('prefixesDivBy5', () => {
  expect(prefixesDivBy5([0, 1, 1])).toEqual([true, false, false])
  expect(prefixesDivBy5([1, 1, 1])).toEqual([false, false, false])
  expect(prefixesDivBy5([0, 1, 1, 1, 1, 1])).toEqual([true, false, false, false, true, false])
  expect(prefixesDivBy5([1, 1, 1, 0, 1])).toEqual([false, false, false, false, false])
})
