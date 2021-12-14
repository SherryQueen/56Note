/**
 * @filename    trap.js
 * @author      56
 * @description https://leetcode-cn.com/problems/trapping-rain-water/
 */

/*
根据题意. 能接雨水的区域满足 n in [i, j] height[i] > height[n] > height[j]
故我们可以借助单调栈, 计算 是否构成可接雨水的区域
当遍历到 i 时. 我们可以进行如下判断
如果栈为空, 则i入栈
如果栈不为空, 则继续
我们取栈顶值 t 判断 height[i] 与 height[t] 的大小来判断是否可构成积水区
若 height[t] >= height[i] 则判断 t -> i 不能直接构成积水区, 则 i 入栈 重复当前判断
若 height[t] < height[i] 则可形成积水区. 积水左边界为 t-1(若左边界不存在,则退出判断. 且 i 入栈). 积水宽度 t - (t-1) - 1 积水区高度 min(height[i],height[t-1]) - height[t]. t出栈. 重复当前判断
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const len = height.length
  if (len <= 2) return 0
  const stack = []
  let water = 0
  for (let i = 0; i < len; i++) {
    while (stack.length && height[stack[stack.length - 1]] < height[i]) {
      const t = stack.pop()
      if (!stack.length) break
      const l = stack[stack.length - 1]
      water += (i - l - 1) * (Math.min(height[l], height[i]) - height[t])
    }
    stack.push(i)
  }
  return water
}

console.info(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
