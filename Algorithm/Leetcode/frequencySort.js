/**
 * @filename    frequencySort.js
 * @author      56
 * @description https://leetcode-cn.com/problems/sort-characters-by-frequency/
 */

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  const map = new Map()
  for (let i = 0, len = s.length; i < len; i++) {
    const c = s[i]
    const count = map.get(c) || 0
    map.set(c, count + 1)
  }
  let result = ''
  Array.from(map.keys())
    .sort((a, b) => map.get(b) - map.get(a))
    .forEach((k) => {
      let count = map.get(k)
      while (count--) result += k
    })
  return result
}
