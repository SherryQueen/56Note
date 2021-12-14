// 快速排序
// 1. 我们寻找一个基准值piv. (一般是当前数组左下标值l). 再设定一个中间值 ans(用于替换遍历之后, nums[piv]应该所在的位置)
// 2. 我们遍历 piv+1 -> r    nums[i] < nums[piv] 则与ans替换(ans替换完成后+1)  nums[i] > nums[piv] 则不做操作
// 3. 当遍历完成. 我们将 piv 和 中间值下标ans-1进行替换. 则实现 ans左边的值<nums[ans] ans右边的值>nums[ans]
function quickSort(nums) {
  const len = nums.length
  const swap = (a, b) => ([nums[a], nums[b]] = [nums[b], nums[a]])
  const sort = (l, r) => {
    if (l >= r) return
    const piv = l
    let ans = l + 1
    for (let i = ans; i <= r; i++) {
      if (nums[piv] > nums[i]) swap(i, ans++)
    }
    swap(piv, ans - 1)
    sort(piv, ans - 2)
    sort(ans, r)
  }

  sort(0, len - 1)
  return nums
}
