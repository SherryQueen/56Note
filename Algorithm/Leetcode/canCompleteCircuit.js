/**
 * @filename    canCompleteCircuit.js
 * @author      56
 * @description https://leetcode-cn.com/problems/gas-station/
 */
const canCompleteCircuit = function (gas, cost) {
  const n = gas.length;
  let i = 0;
  while (i < n) {
    let _gas = 0;
    let _cost = 0;
    let j = 0;
    while (j < n) {
      const idx = (i + j) % n;
      _gas += gas[idx];
      _cost += cost[idx];
      if (_cost > _gas) break;
      j++;
    }
    if (j === n) return i;
    i = i + j + 1; // i-j 之间的加油站 都不能抵达j
  }
  return -1;
};

console.info(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
