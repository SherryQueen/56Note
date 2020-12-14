/**
 * @filename    groupAnagrams.js
 * @author      56
 * @description https://leetcode-cn.com/problems/group-anagrams/
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const len = strs.length
  if (!len) return []
  const map = {}
  strs.forEach((str) => {
    const val = str
      .split('')
      .sort((a, b) => (a < b ? -1 : 1))
      .join('')
    if (map[val]) map[val].push(str)
    else map[val] = [str]
  })
  return Object.values(map)
}

console.info(groupAnagrams(['ddddddddddg', 'dgggggggggg']))
console.info(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
