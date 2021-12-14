// 希尔排序
// 希尔排序是对插入排序的优化
// 1. 我们将数组按下标的一定增量分成多组. 每组按照插入排序进行排列
// 2. 每次将增量-1. 重复1. 当增量减为1, 数组只被分为一组

function shell(nums) {
  const len = nums.length
  let shell = (len / 2) | 0
  while (shell) {
    for (let i = 0; i < shell; i++) {
      for (let j = i + shell; j < len; j += shell) {
        const ans = nums[j]
        let k = j
        while (k >= shell) {
          if (nums[k - shell] < ans) break
          nums[k] = nums[k - shell]
          k -= shell
        }
        nums[k] = ans
      }
    }
    shell--
  }
  return nums
}

console.info(shell([2, 1, 3]))
console.info(shell([5, 3, 6, 4, 1, 7, 2, 2]))
