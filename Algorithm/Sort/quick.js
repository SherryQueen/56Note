/**
 * 快排
 * (在当前范围内 l, r)
 * 1. 寻找一个基准值 piv.  排序后形成基准值左边值小于基准. 右边值大于基准
 * 2. 定义替换下标 idx = piv+1.
 * 3. 从下标i = idx 开始, 依次遍历
 * 4. 若当前遍历值 [i] < [piv] 则 swap(i, idx), idx+1
 * 5. 遍历结束后, swap(piv, i-1) 让基准值居中, 形成左边小于基准值, 右边大于基准值的结果
 * 6. 迭代 [l, piv)  (piv, r] 直到结束
 */
function sort(nums) {
  const len = nums.length
  function _sort(l, r) {
    if (r <= l) return
    let piv = l
    let idx = piv + 1
    for (let i = idx; i <= r; i++) {
      if (nums[piv] > nums[i]) {
        ;[nums[i], nums[idx]] = [nums[idx], nums[i]]
        idx++
      }
    }
    ;[nums[piv], nums[idx - 1]] = [nums[idx - 1], nums[piv]]
    _sort(l, idx - 2)
    _sort(idx, r)
  }
  _sort(0, len - 1)
  return nums
}

console.info(sort([5, 3, 6, 4, 1, 7, 2]))
