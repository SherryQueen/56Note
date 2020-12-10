/**
 * 思路: BFS搜索, 每次一波队列搜索完毕, 即可确认为一步
 *      遍历自 0000 开始的所有可能, 若遇到结果例子,则返回当前步骤(答案), 若遇到已访问例子(包含死锁), 则跳过
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
const openLock = function (deadends, target) {
  if (target === '0000') return 0; // * The initial value is equals target value

  const map = {};
  for (let i = 0, len = deadends.length; i < len; i++) {
    if (deadends[i] === '0000') return -1; // * The deadens includes the initial value, the lock is can't be unlocked
    map[deadends[i]] = true;
  }

  const isNormal = (key) => {
    if (map[key]) return false;
    map[key] = true;
    return true;
  };

  let step = 0;
  let haveSolved = false;
  const queue = [[0, 0, 0, 0]];
  while (!haveSolved && queue.length) {
    const currents = [...queue];
    queue.length = 0; // * Clear queue
    step++; // * Step up
    console.log('step:', step);
    for (let i = 0, len = currents.length; i < len; i++) {
      for (let j = 0; j < 4; j++) {
        const a = [...currents[i]];
        const b = [...currents[i]];

        a[j] = a[j] === 9 ? 0 : a[j] + 1;
        b[j] = b[j] === 0 ? 9 : b[j] - 1;

        const ak = a.join('');
        const bk = b.join('');

        if (ak === target || bk === target) {
          haveSolved = true;
          break;
        }

        if (isNormal(ak)) queue.push(a);
        if (isNormal(bk)) queue.push(b);
      }
      if (haveSolved) break;
    }
  }

  return haveSolved ? step : -1;
};

console.log(openLock(['2222'], '0102'));
