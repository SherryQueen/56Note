/**
 * 插入排序
 * 1. 顺序遍历每个元素 下标为i
 * 2. 反向遍历 直到找到特殊的下标j 满足 [j-1] <= [i] <= [j] (这里可以优化, 即在反向遍历过程中,实现相邻数据交换. 从而避免最终插入数组中时,相关位置数据右移)
 */

function insertion(nums) {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (nums[j - 1] > nums[j]) {
        ;[nums[j - 1], nums[j]] = [nums[j], nums[j - 1]]
      }
    }
  }
  return nums
}

console.info(insertion([5, 3, 6, 4, 1, 7, 2]))
