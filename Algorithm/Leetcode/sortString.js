/**
 * @filename    sortString.js
 * @author      56
 * @description https://leetcode-cn.com/problems/increasing-decreasing-string/
 */

// * 先按大小字符排序，通过数组来标记出现次数
// * 按先 左到右 再 右到左 的遍历拼接字符串
const sortString = function (s) {
  const len = s.length;
  if (len === 1) return s;
  let result = "";
  const array = [];
  for (let i = 0; i < len; i++) {
    const charCode = s[i].charCodeAt(0) - 97;
    array[charCode] = (array[charCode] || 0) + 1;
  }

  let reverse = false;
  let idx = 0;
  while (result.length < len) {
    const num = array[idx];
    if (num) {
      array[idx] -= 1;
      result += String.fromCharCode(idx + 97);
    }
    idx = reverse ? idx - 1 : idx + 1;
    if (idx < 0) {
      idx = 0;
      reverse = false;
    } else if (idx === array.length) {
      idx = array.length - 1;
      reverse = true;
    }
  }
  return result;
};

console.info(sortString("cbabc"));
