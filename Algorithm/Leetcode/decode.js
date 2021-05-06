/**
 * @filename    decode.js
 * @author      56
 * @description https://leetcode-cn.com/problems/decode-xored-array/
 */

/**
 * encoded[i-1] = arr[i] XOR arr[i-1]
 * encoded[i-1] XOR arr[i-1] = arr[i] XOR arr[i-1] XOR arr[i-1]
 * encoded[i-1] XOR arr[i-1] = arr[i] XOR 0 = arr[i]
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function (encoded, first) {
  return encoded.reduce(
    (prev, cur) => {
      prev.push(cur ^ prev[prev.length - 1])
      return prev
    },
    [first],
  )
}
