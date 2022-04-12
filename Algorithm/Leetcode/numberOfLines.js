/**
 * @filename    numberOfLines.js
 * @author      56
 * @description https://leetcode-cn.com/problems/number-of-lines-to-write-string/
 */

/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function (widths, s) {
  let lines = 1
  let useWidth = 0
  for (const c of s) {
    const width = widths[c.charCodeAt() - 97]
    useWidth += width
    if (useWidth > 100) {
      lines++
      useWidth = width
    }
  }
  return [lines, useWidth]
}
