/**
 * @filename    removeDuplicates.js
 * @author      56
 * @description https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/
 */

/**
 * 1. 根据题意, abba -> aa -> '' 我们可以看到符合栈的一个特性. 即当前字符和栈顶元素是否相等, 相等即可去除
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
  const stack = []
  for (let i = 0, len = S.length; i < len; i++) {
    S[i] === stack[stack.length - 1] ? stack.pop() : stack.push(S[i])
  }
  return stack.join('')
}
