/**
 * @filename    countPrimes.js
 * @author      56
 * @description https://leetcode-cn.com/problems/count-primes/
 */

const countPrimes = function (n) {
  if (n <= 2) return 0;
  const primes = [...Array(n)].fill(1);
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (primes[i]) {
      count++;
      for (let j = i * i; j < n; j += i) primes[j] = 0;
    }
  }
  return count;
};

console.info(countPrimes(3));
console.info(countPrimes(4));
console.info(countPrimes(5));
console.info(countPrimes(10));
console.info(countPrimes(100));
