/**
 * @filename    isAnagram.js
 * @author      56
 * @description https://leetcode-cn.com/problems/valid-anagram/
 */

const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const m = {};
  for (let i = 0, len = s.length; i < len; i++) {
    m[s[i]] = (m[s[i]] || 0) + 1;
  }
  for (let i = 0, len = s.length; i < len; i++) {
    if (!m[t[i]]) return false;
    if (--m[t[i]] < 0) return false;
  }
  return true;
};

console.info(isAnagram("rat", "cat"));
console.info(isAnagram("anagram", "nagaram"));
