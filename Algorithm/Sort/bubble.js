/**
 * 冒泡
 * 1. 每次比较相邻的两元素 i, i+1 若 [i] > [i+1] 则 交换
 * 2. 一次遍历完成后, 即可得到 最大值在队尾
 * 3. 多次重复遍历后(因为一次循环,必有一个最大值被放到队尾), 当 i=2也是最大值, 或遍历过程中无交换发生, 即可认为排序结束
 */

function bubble(nums) {
  let len = nums.length
  while (len) {
    let hasSwap = false
    for (let i = 1; i < len; i++) {
      if (nums[i - 1] > nums[i]) {
        hasSwap = true
        ;[nums[i - 1], nums[i]] = [nums[i], nums[i - 1]]
      }
    }
    if (!hasSwap) break
    len--
  }
  return nums
}

console.info(bubble([5, 3, 6, 4, 1, 7, 2]))
