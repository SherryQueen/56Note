/**
 * @filename    transpose.js
 * @author      56
 * @description https://leetcode-cn.com/problems/transpose-matrix/
 */

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
  const rows = matrix.length;
  if (rows === 0) return [];
  const cols = matrix[0].length;

  const result = [...Array(cols)].map(() => []);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
};
