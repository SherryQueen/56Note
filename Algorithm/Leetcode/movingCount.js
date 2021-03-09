/**
 * https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 *
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标* 和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const movingCount = function(m, n, k) {
  let res = 0;
  const map = {};
  if (k === 0) return 1;
  const stack = [{ x: 0, y: 0 }];

  const calcNumber = num => {
    let sum = 0;
    let ans = num;
    while (ans) {
      sum += ans % 10;
      ans = Math.floor(ans / 10);
    }
    return sum;
  };

  const canAccess = (x, y) => {
    if (x < 0 || x === m || y < 0 || y === n || calcNumber(x) + calcNumber(y) > k) return false;
    return true;
  };

  const getKey = (x, y) => x + '_' + y;

  const move = (x, y) => {
    if (!map[getKey(x, y)] && canAccess(x, y)) {
      map[getKey(x, y)] = true;
      stack.push({ x, y });
    }
  };

  map[getKey(0, 0)] = true;
  while (stack.length) {
    const p = stack.pop();
    res += 1;

    const { x, y } = p;

    move(x + 1, y);
    move(x - 1, y);
    move(x, y + 1);
    move(x, y - 1);
  }
  return res;
};

console.assert(movingCount(3, 2, 17) === 6);
console.assert(movingCount(5, 3, 0) === 1);
console.assert(movingCount(2, 3, 1) === 3);
