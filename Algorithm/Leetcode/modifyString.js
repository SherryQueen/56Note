/**
 * @filename    modifyString.js
 * @author      56
 * @description https://leetcode-cn.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters/
 */

/*
根据题意.我们要找出所有问号所在的下标
针对每个下标`i`,我们可以从 `a` 开始进行替换,如若不合规则继续 `b`, `c`(因为不允许连续重复,三个字符够用了)
因为不允许连续重复,我们需要比对 `i-1`与`i+1`的字符是否与i替换后的相等.
*/

/**
 * @param {string} s
 * @return {string}
 */
var modifyString = function (s) {
  const arr = [...s]
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] !== '?') continue
    for (const c of ['a', 'b', 'c']) {
      if (arr[i - 1] === c || arr[i + 1] === c) continue
      arr[i] = c
      break
    }
  }
  return arr.join('')
}
