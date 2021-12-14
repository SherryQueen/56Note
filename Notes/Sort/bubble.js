// 冒泡排序:
// 1. 比对相邻两个数 i, i+1 若 [i] > [i+1] 则交换二者位置
// 2. 一次比较完成，大的数字如同水里的泡泡一样冒到了最高位
// Tips: 如果比较过程未发生交换， 即当前已经完成排序。
function bubble(nums) {
  let ans = nums.length
  while (ans--) {
    let hasSwap = false
    for (let i = 0; i < ans; i++) {
      if (nums[i] > nums[i + 1]) {
        hasSwap = true
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
      }
    }
    if (!hasSwap) break
  }
  return nums
}
console.info(bubble([5, 3, 6, 4, 1, 7, 2]))
