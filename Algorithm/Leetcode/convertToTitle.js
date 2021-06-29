/**
 * @filename    convertToTitle.js
 * @author      56
 * @description https://leetcode-cn.com/problems/excel-sheet-column-title/
 */

/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  const map = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
    11: 'K',
    12: 'L',
    13: 'M',
    14: 'N',
    15: 'O',
    16: 'P',
    17: 'Q',
    18: 'R',
    19: 'S',
    20: 'T',
    21: 'U',
    22: 'V',
    23: 'W',
    24: 'X',
    25: 'Y',
    0: 'Z', // 26 -> 'Z' 取余刚好为0
  }
  let res = ''
  let num = columnNumber
  while (num > 0) {
    let ans = num % 26
    res = map[ans] + res
    num = Math.floor(num / 26)
    if (ans === 0) num -= 1
  }
  return res
}
