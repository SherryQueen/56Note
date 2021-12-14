/**
 * @filename    reverseParentheses.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reverse-substrings-between-each-pair-of-parentheses/
 */

/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  const arr = s.split('')
  let stack = []
  arr.forEach((c) => {
    if (c === ')') {
      // ? 可以用栈实现反转
      const idx = stack.lastIndexOf('(')
      const array = stack.slice(idx + 1)
      stack = [...stack.slice(0, idx), ...array.reverse()]
    } else stack.push(c)
  })
  return stack.join('')
}

console.info(reverseParentheses('(abcd)'))
console.info(reverseParentheses('(u(love)i)'))
