/**
 * @filename    isNStraightHand.js
 * @author      56
 * @description https://leetcode-cn.com/problems/hand-of-straights/
 */

/*
因为要构成顺子.且所有牌都要用上. 所以我们需要保证牌数是`groupSize`的倍数
如何分组. 我们可以从牌堆中找出牌面值最小的牌开始构成组. 并依次递增直到满足 `groupSize`
1. 从牌堆取出最小牌面值=i 的牌
2. 寻找牌面值=i+1的牌. 寻找到了.进行3的判断 未找到则不能构成牌组
3. 完成了一组长度=`groupSize` 重复1, 直到牌堆无牌 .
*/

/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
 var isNStraightHand = function (hand, groupSize) {
  const len = hand.length
  if (len % groupSize) return false // 不能按groupSize全部分组

  const hands = hand.sort((a, b) => a - b)
  const map = new Map()
  hands.forEach((h) => map.set(h, (map.get(h) || 0) + 1))

  for (const x of hands) {
    if (!map.has(x)) continue
    for (let i = 0; i < groupSize; i++) {
      const ans = map.get(x + i)
      if (ans) ans === 1 ? map.delete(x + i) : map.set(x + i, ans - 1)
      else return false
    }
  }
  return true
}
