/**
 * @filename    reorganizeString.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reorganize-string/
 */

const reorganizeString = function (S) {
  const len = S.length;
  if (len < 2) return S;

  let max = 0;
  const array = [...Array(26)].fill(0);
  for (let i = 0; i < len; i++) {
    const c = S[i].charCodeAt() - 97;
    array[c] = (array[c] || 0) + 1;
    if (array[c] > array[max]) max = c;
  }

  if (array[max] > Math.ceil(len / 2)) return "";

  const result = [];
  let j = 0; // 先偶数位，再奇数位
  for (let i = 0; i < 26; i++) {
    let idx = i + max;
    if (idx >= 26) idx -= 26;
    if (!array[idx]) continue;

    const char = String.fromCharCode(idx + 97);
    while (array[idx]--) {
      result[j] = char;
      j += 2;
      if (j >= len) j = 1;
    }
  }
  return result.join("");
};

console.info(reorganizeString("abc"));
console.info(reorganizeString("abccc"));
console.info(reorganizeString("abcccc"));
