/**
 * @filename    maxConsecutiveAnswers.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximize-the-confusion-of-an-exam/
 */

/**
 * 根据题意, 我们可以转化为分别求字符转为 T/F 的最长序列的长度
 * 故可以考虑通过滑动窗口, 通过变量 k 记录可转化的次数, 从而求得最长的长度.
 * 最后通过比较返回结果
 */

/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
  const calcContainer = (to) => {
    const len = answerKey.length
    let ans = 0 // 最大长度
    let remain = 0 // 需要转换的字符

    for (let l = 0, r = 0; r < len; r++) {
      if (answerKey[r] !== to) remain++ // 使用一次转换机会
      // 当转换机会超过可用次数
      while (remain > k) {
        if (answerKey[l++] !== to) remain-- // 恢复一次转换机会
      }
      ans = Math.max(ans, r - l + 1) // 获得转换机会用完后的最大长度
    }
    return ans
  }

  return Math.max(calcContainer('T'), calcContainer('F'))
}
