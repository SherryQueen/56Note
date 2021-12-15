# array_of_difference|差分数组

> tags: #Algorithm #Array #差分数组

## ⚡️ 定义

- 差分数组是个数组 定义为 `diff[i] = arr[i] - arr[i-1]` 即差分数组中的每一项表示相邻数字的差值

## 🌰 例子

```js
const arr = [0, 2, 1, 5, 4, 3];
const diff = [0, 2, -1, 4, -1, -1];
```

- 当我们对某个区间之间的数进行统一操作时, 比如 针对 区间 [1, 4] 之间的数统一+3 则只需要 diff[1]+=3; diff[5]-=3 因为统一操作, 所在在相邻范围内的数字之间的差值保持不变.

```js
diff = [0, 5, -1, 4, -1, -4];
// 根据 arr[i] = arr[i-1] + diff[i] 计算得到
arr = [0, 5, 4, 8, 7, 3];
```

## LeetCode

- 题目: [check-if-all-the-integers-in-a-range-are-covered](https://leetcode-cn.com/problems/check-if-all-the-integers-in-a-range-are-covered/)
- 解法: [check-if-all-the-integers-in-a-range-are-covered.js](https://github.com/SherryQueen/56Note/blob/main/Algorithm/Leetcode/check-if-all-the-integers-in-a-range-are-covered.js)
