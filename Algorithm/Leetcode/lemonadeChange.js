/**
 * @filename    lemonadeChange.js
 * @author      56
 * @description https://leetcode-cn.com/problems/lemonade-change/
 */

/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = function (bills) {
  if (!bills.length) return true;
  let five = 0;
  let ten = 0;
  for (let b of bills) {
    if (b === 5) {
      five++;
      continue;
    }

    // 缺少5元 无法找零
    if (!five) return false;

    // 10元找零5元
    if (b === 10) {
      five--;
      ten++;
      continue;
    }

    // 优先 10+5找零
    if (ten) {
      ten--;
      five--;
      continue;
    }
    // 凑不齐15元找零
    if (five < 3) return false;
    // 3张5元找零
    five -= 3;
  }
  return true;
};
