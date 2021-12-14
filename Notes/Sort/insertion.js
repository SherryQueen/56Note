// 插入排序
// 1. 顺序遍历每一项
// 2. 反向遍历 i -> 0。直到找到 [i] < [j]. 然后将i 插入到j前
// Tips: 因为反向遍历找到目标下标后需要移动 j->i的之间的位置。 固我们可以在反向遍历时.直接对 [j] = [j-1]赋值
function insertion(nums) {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    let ans = nums[i]
    let j = i
    while (j) {
      if (nums[j - 1] < ans) break
      nums[j] = nums[j - 1]
      j--
    }
    nums[j] = ans
  }
  return nums
}

console.info(insertion([5, 3, 6, 4, 1, 7, 2, 2]))
