/**
 * @filename    findShortestSubArray.js
 * @author      56
 * @description https://leetcode-cn.com/problems/degree-of-an-array/
 */

/**
 * 1. 题目要求寻找到相同度的最短子序列. 可转换为 求出现次数最多的数字的 起始位置和终点位置.
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  const len = nums.length
  if (len === 1) return 1

  let maxArr = [nums[0]]
  const map = { [maxArr[0]]: { count: 1, range: [0, 0] } }

  for (let i = 1; i < len; i++) {
    const num = nums[i]
    let obj

    const maxCount = map[maxArr[0]].count

    if (map[num]) {
      obj = map[num]
      obj.count++
      obj.range[1] = i
    } else {
      obj = { count: 1, range: [i, i] }
      map[num] = obj
    }

    if (obj.count > maxCount) maxArr = [num]
    else if (obj.count === maxCount) maxArr.push(num)
  }

  let count = len
  for (let i = 0, mLen = maxArr.length; i < mLen; i++) {
    const range = map[maxArr[i]].range
    const l = range[1] - range[0] + 1
    if (l < count) count = l
  }
  return count
}

console.info(findShortestSubArray([1, 2, 2, 3, 1, 4, 2]))
console.info(findShortestSubArray([1, 2, 2, 3, 1]))
