/**
 * @filename    smallestK.js
 * @author      56
 * @description https://leetcode-cn.com/problems/smallest-k-lcci/
 */

/*
取数据前K项. 首先想到的就是排序.
*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function (arr, k) {
  const len = arr.length
  if (len < k) return arr

  const sort = (l, r) => {
    if (l >= r) return
    let piv = l
    let idx = piv + 1
    for (let i = idx; i <= r; i++) {
      if (arr[piv] > arr[i]) {
        ;[arr[idx], arr[i]] = [arr[i], arr[idx]]
        idx++
      }
    }
    ;[arr[piv], arr[idx - 1]] = [arr[idx - 1], arr[piv]]
    sort(l, idx - 2)
    sort(idx, r)
  }
  sort(0, len - 1)
  return arr.slice(0, k)
}
