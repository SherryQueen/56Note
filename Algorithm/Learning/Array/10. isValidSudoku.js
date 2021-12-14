/**
 * @filename    10. isValidSudoku.js
 * @author      56
 * @description https://leetcode-cn.com/problems/valid-sudoku/
 */

/**
 * 1. 因为是判断数独是否有效. 即判断 符合规则的情况下  在 每行/每列/每个3x3中是否有重复值
 * 2. 故可以通过一个map来记录每行/每列/3x3中出现的数. 并进行遍历. 若有, 则认为是无效
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  // 三个判断条件, 对应判断结果. 通过 下标作为数字的key
  // const rows = [...Array(9)].map(() => [])
  // const cols = [...Array(9)].map(() => [])
  // const areas = [...Array(9)].map(() => [])
  // for (let i = 0; i < 9; i++) {
  //   for (let j = 0; j < 9; j++) {
  //     const n = board[i][j]
  //     if (n === '.') continue
  //     const num = n.charCodeAt() - 49 // '1' => 0
  //     const areaIdx = Math.floor(j / 3) + Math.floor(i / 3) * 3
  //     if (rows[i][num] || cols[j][num] || areas[areaIdx][num]) return false
  //     rows[i][num] = cols[j][num] = areas[areaIdx][num] = true
  //   }
  // }
  // return true

  let cache = {}
  // 横行
  for (let i = 0; i < 9; i++) {
    cache = {}
    for (let j = 0; j < 9; j++) {
      const n = board[i][j]
      if (n === '.') continue
      if (cache[n]) return false
      cache[n] = true
    }
  }

  // 纵行
  for (let i = 0; i < 9; i++) {
    cache = {}
    for (let j = 0; j < 9; j++) {
      const n = board[j][i]
      if (n === '.') continue
      if (cache[n]) return false
      cache[n] = true
    }
  }

  // 区块
  for (let i = 0; i < 9; i++) {
    cache = {}
    const row = Math.floor(i / 3) * 3
    const col = (i % 3) * 3
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const n = board[j + row][k + col]
        if (n === '.') continue
        if (cache[n]) return false
        cache[n] = true
      }
    }
  }
  return true
}

console.info(
  isValidSudoku([
    ['.', '9', '.', '.', '4', '.', '.', '.', '.'],
    ['1', '.', '.', '.', '.', '.', '6', '.', '.'],
    ['.', '.', '3', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '7', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '5', '.', '.', '.', '.'],
    ['.', '.', '7', '.', '.', '4', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '7', '.', '.', '.', '.'],
  ]),
)
