/**
 * @filename    largestNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/largest-number/
 */

/**
 * 1. 对每个数字按照其从左到右的数字进行排序. 后累加即为最大值
 * 2. 长度相同 则 逐一比较. 长度不相同 则拼接成单个字符串进行比较
 * 3. 注意下 [0, 0, 0] 的情况. 确保不出现 '00' 或 '000' 这种情况
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  const res = nums
    .sort((a, b) => {
      let aStr = a + ''
      let bStr = b + ''
      let al = aStr.length
      let bl = bStr.length
      if (al !== bl) {
        ;[aStr, bStr] = [aStr + bStr, bStr + aStr]
      }
      for (let i = 0, len = aStr.length; i < len; i++) {
        if (aStr[i] > bStr[i]) return -1
        if (aStr[i] < bStr[i]) return 1
      }
      return 0
    })
    .join('')
  return res[0] === '0' ? '0' : res
}

console.info(largestNumber([432, 43243]))
