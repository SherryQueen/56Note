/**
 * @filename    candy.js
 * @author      56
 * @description https://leetcode-cn.com/problems/candy/
 */

/**
 * 从左往右: 第一个同学给1颗🍬, 若 ratings[i] > ratings[i-1] 则🍬+1 否则则给1(因为只有分数高才需要多给一颗🍬)
 * 从右往左: 最后一位同学有🍬若干(上一步计算可得), 若 ratings[i] > ratings[i+1] 则🍬+1 否则即给1颗 (因为从左往右已确定i同学取糖若干，故比较二者，取最大值即同时符合从左往右和从右往左)
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const len = ratings.length
  if (len <= 1) return len

  const candies = [1]
  for (let i = 1; i < len; i++) {
    if (ratings[i] > ratings[i - 1]) candies.push(candies[i - 1] + 1)
    else candies.push(1)
  }

  let sum = candies[len - 1]
  for (let i = len - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1)
    sum += candies[i]
  }
  return sum
}

test('candy', () => {
  expect(candy([1, 0, 2])).toBe(5)
  expect(candy([1, 2, 2])).toBe(4)
  expect(candy([1, 0, 0, 1])).toBe(6)
})
