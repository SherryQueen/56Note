/**
 * @filename    validTicTacToe.js
 * @author      56
 * @description https://leetcode-cn.com/problems/valid-tic-tac-toe-state/
 */

/*
根据游戏规则, 我们可以总结出如下的判断条件
1. 因为先放X. 所以num(X)等于num(O) 或 num(O+1)
2. 当X获胜, 则 num(X) = num(O+1) 且 X 满足获胜条件(横线/竖线/对角线都为X)
3. 当O获胜, 则 num(x) = num(O) 且 O 满足获胜条件
*/

/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
  let x = 0
  let y = 0
  board.forEach((b) => {
    for (const c of b) {
      if (c === 'X') x++
      else if (c === 'O') y++
    }
  })

  if (x !== y && x !== y + 1) return false
  if (isWin('X') && x !== y + 1) return false
  if (isWin('O') && x !== y) return false
  return true

  function isWin(p) {
    if (
      (p === board[0][0] && p === board[1][1] && p === board[2][2]) ||
      (p === board[0][2] && p === board[1][1] && p === board[2][0])
    )
      return true
    for (let i = 0; i < 3; i++) {
      if (
        (p === board[i][0] && p === board[i][1] && p === board[i][2]) ||
        (p === board[0][i] && p === board[1][i] && p === board[2][i])
      )
        return true
    }
    return false
  }
}

console.info(validTicTacToe(['OXX', 'XOX', 'OXO']))
