/**
 * @filename    fizzBuzz.js
 * @author      56
 * @description https://leetcode-cn.com/problems/fizz-buzz/
 */

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  const result = [...Array(n)].map((_, i)=>(i+1).toString());
  for(let i = 2; i < n; i+=3) result[i] = 'Fizz'
  for(let i = 4; i < n; i+=5) result[i] = 'Buzz'
  for(let i = 14; i< n; i+=15) result[i] = 'FizzBuzz'
  return result
};
