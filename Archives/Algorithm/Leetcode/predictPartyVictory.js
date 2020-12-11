/**
 * @filename    predictPartyVictory.js
 * @author      56
 * @description https://leetcode-cn.com/problems/dota2-senate/
 */

/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  const len = senate.length;
  let R = 0; // 被跳过的 Radiant
  let D = 0; // 被跳过的 Dire
  let v = len; // 有投票的人数

  const disable = [...Array(len)].fill(false);
  let i = 0;
  while (v) {
    if (!disable[i]) {
      if (senate[i] === "R") {
        if (R) {
          // 一位Radiant被跳过
          disable[i] = true;
          R--;
          v--;
        } else D++; // 跳过一位Dire
      } else {
        if (D) {
          // 一位Dire被跳过
          disable[i] = true;
          D--;
          v--;
        } else R++; // 跳过一位Radiant
      }
      if (v === R) return "Dire";
      if (v === D) return "Radiant";
    }
    if (++i === len) i = 0;
  }
};

console.info(predictPartyVictory("RD"));
