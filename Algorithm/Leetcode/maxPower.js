/**
 * @filename    maxPower.js
 * @author      56
 * @description https://leetcode-cn.com/problems/consecutive-characters/
 */

/*
因为是判断连续的子字符串,故我们逐位与前一位进行比较即可判定是否当前子字符串,然后记录下当前子字符串的长度.并与变量比较.当一次遍历完成.即可得到最大值
*/

/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
  const len = s.length
  if (len === 0) return 0
  let max = 0
  let ans = 0
  for (let i = 0; i < len; i++) {
    if (s[i] === s[i - 1]) ans++
    else {
      max = Math.max(max, ans)
      ans = 1
    }
  }
  return Math.max(max, ans)
}
