/**
 * @filename    3. rotate.js
 * @author      56
 * @description https://leetcode-cn.com/problems/rotate-array/
 */

/**
 * 1. 根据题意, 我们可以将 i 的赋值给 (i+k)%len 即完成右移
 * 2. 那么返推 即 nums[i] = nums[i - k < 0? i - k + len: i-k]
 * 3. 根据2. 我们可以得到一个解法, 即对 i, i+k, i+2k... 进行赋值. 直到 (i+nk)%len = i 即 nk === len的倍数 完成一次循环, 再继续对 i+1, i+2 进行循环判断, 即可移动完所有结果
 * @param {*} nums
 * @param {*} k
 */
var rotate = function (nums, k) {
  const len = nums.length
  const _k = k % len // 压缩计算路径
  let count = len // 总移动次数

  for (let i = 0; i < _k; i++) {
    let temp = nums[i]
    nums[i] = nums[i - _k + len]
    count--

    let j = i + _k

    while (j !== i) {
      ;[nums[j], temp] = [temp, nums[j]]
      count--
      j += _k
      if (j >= len) j -= len
    }
    if (!count) break
  }
  return nums
}

console.info(rotate([1, 2, 3, 4, 5, 6, 7], 3))
