/**
 * @filename    construct2DArray.js
 * @author      56
 * @description https://leetcode-cn.com/problems/convert-1d-array-into-2d-array/
 */

/*
首先判断是否能构成二维数组. 即判断原始数组长度是否等于二维数组的长度. 若不符合则返回空数组
若符合判断条件了, 则按二位数组的每行长度进行截断后填充
*/

/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function (original, m, n) {
  const len = original.length
  if (len !== m * n) return []

  const res = []
  for (let i = 0; i < m; i++) {
    res.push(original.slice(i * n, (i + 1) * n))
  }
  return res
}
