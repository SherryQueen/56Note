/**
 * @filename    reverseStr.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reverse-string-ii/
 */

/*
题目要求反转2k个字符的前k个字符. 可转化为 0k-k个字符反装 k-2k个字符不反转
那么我们可以将字符串拆分成 要反转的不反转的多端字符. 做对应的处理后进行拼接 即可得结果
当k=1时, 因为只有一个字符, 反转后依然只有一个字符. 故可直接返回s作为结果
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  if (k === 1) return s
  const reverse = (str) => {
    let res = ''
    for (let i = 0, l = str.length; i < l; i++) res = str[i] + res
    return res
  }

  const len = s.length
  if (len < k) return reverse(s)
  let res = ''
  let i = 0
  while (i < len) {
    res += reverse(s.slice(i, i + k))
    res += s.slice(i + k, i + 2 * k)
    i += 2 * k
  }
  return res
}

console.info(reverseStr('abcdefg', 2))
