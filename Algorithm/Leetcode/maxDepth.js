/**
 * @filename    maxDepth.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximum-nesting-depth-of-the-parentheses/
 */

/*
寻找括号的最大深度. 我们可以转化为求括号栈的最大长度
遇 '(' 入栈. 遇 ')'出栈. 直到循环结束
*/

/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let max = 0;
  const stack = [];
  for (const c of s) {
    if (c === '(') {
      stack.push(1);
      max = Math.max(stack.length, max);
    } else if (c === ')') stack.pop();
  }
  return max;
};
