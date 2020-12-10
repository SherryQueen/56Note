/**
 * @filename    titleToNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/excel-sheet-column-number/
 */

const titleToNumber = function (s) {
  if (!s) return 0;
  let result = 0;
  for (let i = 0, len = s.length; i < len; i++) {
    result = result * 26 + (s[i].charCodeAt() - 64);
  }
  return result;
};

console.info(titleToNumber("ZY"));
