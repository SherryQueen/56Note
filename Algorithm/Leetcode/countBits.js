/**
 * @filename    countBits.js
 * @author      56
 * @description https://leetcode-cn.com/problems/counting-bits/
 */

const cache = [0, 1, 1, 2]

/**
 * 1. 如果 a 是奇数, 则 a比 a-1 多一个比特位
 * 2. 如果 a 是偶数, 则 a和 a/2 有一样的比特位数量
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
  for (let i = cache.length; i <= num; i++) {
    // * 奇数
    if ((i & 1) === 1) cache.push(cache[i - 1] + 1)
    // * 偶数
    else cache.push(cache[i / 2])
  }
  return cache.slice(0, num + 1)
}

console.info(countBits(0))
console.info(countBits(1))
console.info(countBits(2))
console.info(countBits(3))
console.info(countBits(4))
console.info(countBits(5))
console.info(countBits(6))
console.info(countBits(7))
console.info(countBits(10))
console.info(countBits(100))
console.info(countBits(500))
