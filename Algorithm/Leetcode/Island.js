/**
 * 思路: 从任一为1的节点开始, 向四个方向开始遍历, 若为1 则置为0 并向四周继续 若为0, 则停止
 *      有多少次搜索开始, 则有多少个岛屿
 * @param {character[][]} grid 1: 陆地, 0: 海洋
 * @return {number}
 */
const numIslands = function (grid) {
  // * The grid is a valid array
  if (!Array.isArray(grid)) return 0;
  const rows = grid.length;
  const columns = (grid[0] || []).length;
  if (!rows || !columns) return 0;

  const bfs = (x, y) => {
    if (x < 0 || x === rows || y < 0 || y === columns) return;
    if (grid[x][y] === '0') return;

    grid[x][y] = '0';
    bfs(x - 1, y);
    bfs(x + 1, y);
    bfs(x, y - 1);
    bfs(x, y + 1);
  };

  let result = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // * The grid[x][y] is a land
      if (grid[i][j] === '1') {
        result++;
        bfs(i, j);
      }
    }
  }

  return result;
};
