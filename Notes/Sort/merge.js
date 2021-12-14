// 归并排序
// 将排序的任务按段拆分成多个小任务进行
// 1. 将数组分成两部分,
// 2. 若数组长度为2, 则比较当前数组的两个数并返回排序后的数组. 若数组长度为1, 则直接返回数组. 若数组长度大于2.则重复1

function merge(nums) {
  if (nums.length <= 1) return nums
  const mid = (nums.length / 2) | 0
  const left = merge(nums.slice(0, mid))
  const right = merge(nums.slice(mid))

  const result = []
  let i = 0
  let j = 0
  let lLen = left.length
  let rLen = right.length
  while (i < lLen && j < rLen) left[i] < right[j] ? result.push(left[i++]) : result.push(right[j++])
  if (i < lLen) result.push(...left.slice(i))
  if (j < rLen) result.push(...right.slice(j))
  return result
}

console.info(merge([5, 3, 6, 4, 1, 7, 2, 2]))
