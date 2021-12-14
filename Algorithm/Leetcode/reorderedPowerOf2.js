/**
 * @filename    reorderedPowerOf2.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reordered-power-of-2/
 */

/*
因为数字可以重新排序.
我们可以找到在  1->10^9 区间内所有二次幂A
我们计算每个A的 0-9 数字的出现次数.
如果n的出现次数与A中 0-9 数字的出现次数. 即符合题意
 */

const countDigits = (ans) => {
  const cnt = Array(10).fill(0)
  while (ans) {
    cnt[ans % 10]++
    ans = (ans / 10) | 0
  }
  return cnt.join('')
}

const set = new Set()
for (let i = 1; i < 1e9; i <<= 1) set.add(countDigits(i))

var reorderedPowerOf2 = function (n) {
  return set.has(countDigits(n))
}
