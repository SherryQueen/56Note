/**
 * @filename    reverseVowels.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reverse-vowels-of-a-string/
 */

/*
因为只需要交换元音字符. 我们需要判断字符是否为元音字符
因为需要交换, 所以我们通过双指针来进行遍历,找到需要交换的对应下标. 交换即可
*/

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const len = s.length
  if (len === 1) return s

  const arr = Array.from(s)
  const isVowel = (c) => ['a', 'o', 'i', 'e', 'u', 'A', 'O', 'I', 'E', 'U'].includes(c)

  let [l, r] = [0, len - 1]
  while (l < r) {
    while (l < r && !isVowel(arr[l])) l++
    while (r > l && !isVowel(arr[r])) r--
    ;[arr[l], arr[r]] = [arr[r], arr[l]]
    l++
    r--
  }
  return arr.join('')
}

console.info(reverseVowels('leetcode'))
console.info(reverseVowels('aba'))
