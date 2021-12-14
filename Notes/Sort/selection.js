// 选择排序：
// 1. 从 i -> len 遍历。找到当前最小值 j
// 2. 交换 i，j位置，让最小值排在首位
// 3. 多次交换完成，即可完成排序
function selection(nums) {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    let ans = i
    for (let j = i + 1; j < len; j++) {
      if (nums[ans] > nums[j]) ans = j
    }
    if (ans !== i) [nums[i], nums[ans]] = [nums[ans], nums[i]]
  }
  return nums
}

console.info(selection([5, 3, 6, 4, 1, 7, 2]))
